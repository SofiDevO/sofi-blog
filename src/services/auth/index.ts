import WPAPI from 'wpapi';
import Jwt from 'jsonwebtoken';
import type { AstroCookies } from "astro";
import type { LoggedUser } from '@src/types/loggedUser.type';
import type { RegisterUser, RegisterUserResponse } from '@src/types/registerUser.type';
import { wpquery } from '@src/data/wordpress';

import { getUserByName } from './getUserByName';

// Workaround for buffer-equal-constant-time ESM compatibility
import { createRequire } from 'module';
try {
  const require = createRequire(import.meta.url);
  require('buffer-equal-constant-time');
} catch (e) {
  // Silently ignore if not needed
}

const { SECRET_KEY, WPGRAPHQL_URL, SECRET_USER, SECRET_PASSWORD   } = import.meta.env

interface UserEmailResponse {
    users: {
        nodes: Array<{
            email: string;
            id: string;
            name: string;
            firstName: string;
            lastName: string;
            avatar: {
                url: string;
                size: number;
                default: string;
            };
        }>;
    };
}

interface CreateUserResponse {
    createUser: {
        user: RegisterUserResponse;
    };
}


/**
 * Checks if a user is logged in by verifying the access token stored in cookies.
 *
 * @param {AstroCookies} cookies - The cookies object from Astro.
 * @returns {LoggedUser | null} - Returns the logged user data if the user is logged in,
 * or null if the user is not logged in or the token is invalid.
 */
export function isLoggedIn(cookies: AstroCookies): LoggedUser | null {
    const accessToken = cookies.get("accessToken")?.value;
    if (!accessToken ) return null;
    try {
        const decoded = Jwt.verify(accessToken, SECRET_KEY);
        return decoded as LoggedUser;
    }
    catch (error) {
        if (error instanceof Jwt.TokenExpiredError) {
            console.error("Token Expired:", error.message);
            return null;
        }

        if (error instanceof Jwt.JsonWebTokenError) {
            console.error("Invalid Token:", error.message);
            return null;
        }
        console.error(error);
        return null;
    }
}

/**
 * Verifies if a user is valid by checking the credentials against the WordPress REST API.
 */
export async function isValidUser(user: string, password: string): Promise<any> {
    try {
        const url = new URL(WPGRAPHQL_URL);
        const  endpoint = `${url.protocol}//${url.hostname}/wp-json`;

        const wp = new WPAPI({
            endpoint: endpoint,
            username: user,
            password: password,
        });

        let userData = await wp.users().me();
        userData.website = userData.url;

        if (userData.id) {
            const userEmail = await getUserByName(user);
            // Check if userEmail has the expected structure
            if (
                userEmail &&
                typeof userEmail === 'object' &&
                'users' in userEmail
            ) {
                const typedUserEmail = userEmail as UserEmailResponse;
                if (
                    typedUserEmail.users &&
                    Array.isArray(typedUserEmail.users.nodes) &&
                    typedUserEmail.users.nodes.length > 0
                ) {
                    userData.email = typedUserEmail.users.nodes[0].email;
                }
            }
        }

        /* const userData = await wp.users().me(); */

        return userData;

    } catch (error) {
        const err = error as any;
        if(err.code ===  "incorrect_password" || err.code === "invalid_username") {
            console.error("Invalid Credentials:", err.message);
            return null;
        }
        if (err.code === "rest_not_logged_in") {
            console.error("Wordpress connection error:", err.message);
            return null;
        }
        console.error(err.code, err.message);
        return null;
    }
}

/**
 * Registers a new user in WordPress using the GraphQL API.
 *
 * @param {RegisterUser} user - The user data to register.
 * @returns {Promise<RegisterUserResponse>} - The registered user data if the registration is
 * successful, or null if the registration fails.
 */
export async function registerUser(user: RegisterUser): Promise<RegisterUserResponse | null> {
    const query = `
        mutation createUser(
            $username: String = "",
            $password: String = "",
            $lastName: String = "",
            $firstName: String = "",
            $email: String = ""
        ) {
            createUser(
                input: {
                    username: $username,
                    email: $email,
                    password: $password,
                    firstName: $firstName,
                    lastName: $lastName
                }
            ) {
                user {
                    username
                    email
                }
            }
        }
    `
    try {
        const headers = {
            'Authorization': 'Basic ' + btoa(SECRET_USER + ':' + SECRET_PASSWORD)
        }

        const response = await wpquery({query, variables:user, headers});
        const typedResponse = response as CreateUserResponse;
        return typedResponse.createUser.user as RegisterUserResponse;
    } catch (error) {
        return null;
    }
}