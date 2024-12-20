import { wpquery } from "@src/data/wordpress";
const { SECRET_USER, SECRET_PASSWORD } = import.meta.env;

export async function addPost( authorId, title, content, slug) {
    const query = `
       mutation MyMutation {
            createPost(
                input: {content: "Esto es una prueba", authorId: "1", title: "Esto tambien", slug: "miamssdasdasdasssi-gp-2023d"}
            ) {
                post {
                    authorId
                }
            }
        }
  `;
    const headers = {
        'Authorization': 'Basic ' + btoa(SECRET_USER + ':' + SECRET_PASSWORD)
    }

    const variables = { id };
    const data = await wpquery({ query, variables, headers });
    return data;
}