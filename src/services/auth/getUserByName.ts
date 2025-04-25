import { wpquery } from "@src/data/wordpress";

const { SECRET_USER, SECRET_PASSWORD   } = import.meta.env

export async function getUserByName( id: string ) {
    const query = `
        query getUserByEmail {
            users(where: {login: "${id}"}) {
                nodes {
                    email
                }
            }
        }
  `;
    const headers = {
        'Authorization': 'Basic ' + Buffer.from(SECRET_USER + ':' + SECRET_PASSWORD)
    }
    const variables = { id };
    const data = await wpquery({ query, headers });
    return data;
}