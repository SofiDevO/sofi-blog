import { wpquery } from "@src/data/wordpress";

const { SECRET_USER, SECRET_PASSWORD   } = import.meta.env

export async function getUserById( id: string ) {
    const query = `
       query MyQuery7 {
            user(id: "${id}") {
                email
                userId
                username
                slug
            }
        }
  `;
    const headers = {
        'Authorization': 'Basic ' + btoa(SECRET_USER + ':' + SECRET_PASSWORD)
    }
    const variables = { id };
    const data = await wpquery({ query, headers });
    return data;
}