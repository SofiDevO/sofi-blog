import WPAPI from 'wpapi';
import Jwt from 'jsonwebtoken';
import type { AstroCookies } from "astro";
import type { LoggedUser } from '@src/types/loggedUser.type';

const { SECRET_KEY, WPGRAPHQL_URL } = import.meta.env

/**
 * Checks if a user is logged in by verifying the access token stored in cookies.
 *
 * @param {AstroCookies} cookies - The cookies object containing the access token.
 * @returns {LoggedUser | null} - Returns null if the user is not logged in or if the token is
 * invalid. If the token is valid, returns the user data as a LoggedUser object.
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
        const wp = new WPAPI({
            endpoint: `${WPGRAPHQL_URL.replace("/graphql", "")}/wp-json`,
            username: user,
            password: password,
            auth: true,
        });
        const userData = await wp.users().me();
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