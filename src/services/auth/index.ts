import WPAPI from 'wpapi';
import Jwt from 'jsonwebtoken';
import type { AstroCookies } from "astro";

const { SECRET_KEY, WPGRAPHQL_URL } = import.meta.env

/**
 * Checks if a user is logged in by verifying the access token stored in cookies.
 *
 * @param {AstroCookies} cookies - The cookies object containing the access token.
 * @returns {boolean | string[]} - Returns false if the user is not logged in or if 
 * the token is invalid. If the token is valid, returns an array of values from the 
 * decoded token.
 */

export function isLoggedIn(cookies: AstroCookies): boolean | string[] {
    const accessToken = cookies.get("accessToken")?.value;
    if (!accessToken ) return false
    try {
        const decoded = Jwt.verify(accessToken, SECRET_KEY);
        return Object.values(decoded);
    }
    catch (error) {
        return false
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
        return null;
        console.error("JWT Verification Error:", error.message);
    }
}