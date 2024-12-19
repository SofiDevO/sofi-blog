import WPAPI from 'wpapi';
import Jwt from 'jsonwebtoken';
import type { AstroCookies } from "astro";

const { SECRET_KEY, WPGRAPHQL_URL } = import.meta.env

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
    }
}