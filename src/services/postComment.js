import { wpquery } from "@data/wordpress.ts";
const { SECRET_USER, SECRET_PASSWORD } = import.meta.env;

const postComment = async (input, postId = null, parentId = null) => {
    const headers = {
        'Authorization': 'Basic ' + btoa(SECRET_USER + ':' + SECRET_PASSWORD)
    }
 
    const query = `
      mutation postComment(
            $author: String = "Juan Perez",
            $authorUrl: String = "https://itssofi.dev/#portfolio",
            $commentOn: Int = 7,
            $content: String = "comentarioss 🔥",
            $parent: ID = null,
            $authorEmail: String = "raccon@domestcado.com"
        ) {
        createComment(
            input: {author: $author, authorEmail: $authorEmail, authorUrl: $authorUrl, commentOn: $commentOn, parent: $parent, content: $content}
        ) {
            clientMutationId
            success
        }
        }
    `;

    const response = await wpquery({query, variables:input, headers});
    return response;
}


export default postComment;