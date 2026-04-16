import { wpquery } from "@src/data/wordpress";

const SECRET_USER = import.meta.env.SECRET_USER;
const SECRET_PASSWORD = import.meta.env.SECRET_PASSWORD;

export async function getUserByName(id: string) {
  const query = `
        query getUserByEmail {
            users(where: {login: "${id}"}) {
                nodes {
                    email
                    id
                    name
                    firstName
                    lastName
                    avatar {
                        url
                        size
                        default
                    }
                }
            }
        }
  `;
  const headers = {
    Authorization: "Basic " + btoa(SECRET_USER + ":" + SECRET_PASSWORD),
  };
  const variables = { id };
  const data = await wpquery({ query, headers });
  return data;
}
