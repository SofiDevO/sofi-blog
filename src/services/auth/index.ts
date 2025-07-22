import WPAPI from 'wpapi';
import Jwt from 'jsonwebtoken';
import type { AstroCookies } from "astro";
import type { LoggedUser } from '@src/types/loggedUser.type';
import type { RegisterUser, RegisterUserResponse } from '@src/types/registerUser.type';
import { wpquery } from '@src/data/wordpress';

import { getUserByName } from './getUserByName';

const { SECRET_KEY, WPGRAPHQL_URL, SECRET_USER, SECRET_PASSWORD   } = import.meta.env

/**
 * Checks if a user is logged in by verifying the access token stored in cookies.
 *
 * @param {AstroCookies} cookies - The cookies object from Astro.
 * @returns {LoggedUser | null} - Returns the logged user data if the user is logged in,
 * or null if the user is not logged in or the token is invalid.
 */
export function isLoggedIn(cookies: AstroCookies): LoggedUser {
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
 *
 * @param {string} user - The username to verify.
 * @param {string} password - The password to verify.
 * @returns {Promise<WP_User | null>} - Returns the user data if the credentials are valid, or
 * null if the credentials are invalid.
 */
export async function isValidUser(user: string, password: string) {
    try {
        const url = new URL(WPGRAPHQL_URL);
        const  endpoint = `${url.protocol}//${url.hostname}/wp-json`;

        const wp = new WPAPI({
            endpoint: endpoint,
            username: user,
            password: password,
            auth: true,
        });

        let userData = await wp.users().me();
        userData.website = userData.url;

        if (userData.id) {
            const userEmail = await getUserByName(user);
            userData.email = userEmail.users.nodes[0].email;
        }

        /* const userData = await wp.users().me(); */

        return userData;

    } catch (error) {
        if(error.code ===  "incorrect_password" || error.code === "invalid_username") {
            console.error("Invalid Credentials:", error.message);
            return null;
        }
        if (error.code === "rest_not_logged_in") {
            console.error("Wordpress connection error:", error.message);
            return null;
        }
        console.error(error.code, error.message);
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
export async function registerUser(user: RegisterUser): Promise<RegisterUserResponse> {
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
        return response.createUser.user as RegisterUserResponse;
    } catch (error) {
        return null;
    }
}