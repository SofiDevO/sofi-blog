import { wpquery } from "@services/wordpress";

export async function addPost(authorId, title, content, slug) {
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

  const variables = {};
  const data = await wpquery({ query, variables });
  return data;
}
