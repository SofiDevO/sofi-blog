import {postComment} from "@services/postComment.js";
const { SECRET_KEY, WPGRAPHQL_URL, SECRET_USER, SECRET_PASSWORD   } = import.meta.env

function decodeBase64Id(base64String) {
  const decodedString = atob(base64String);
  const numericPart = decodedString.split(":")[1];
  return parseInt(numericPart, 10);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comment-form");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postIdBase64 = form.getAttribute("data-post-id");
    const parentIdBase64 = form.getAttribute("data-parent-id") || "";

    const postId = decodeBase64Id(postIdBase64);
    const parentId = parentIdBase64 ? decodeBase64Id(parentIdBase64) : "";

    const formData = new FormData(form);
    const input = {
      author: formData.get("author"),
      authorEmail: formData.get("authorEmail"),
      authorUrl: formData.get("authorUrl") || "",
      commentOn: postId,
      parent: parentId,
      content: formData.get("content"),
    };
    const headers = {
      'Authorization': 'Basic ' + btoa(SECRET_USER + ':' + SECRET_PASSWORD)
    }
    try {
    /*   const data = await wpquery({
        query: `
            mutation postComment {
            createComment(
                input: {
                author: ${input.author},
                authorEmail: ${input.authorEmail},
                authorUrl: ${input.authorUrl},
                commentOn: ${postId},
                parent: ${parentId},
                content: ${input.content}
            ) {
                clientMutationId
                success
            }
            }
        `,
        variables: { input },
        headers
      }); */

      if (data?.createComment?.success) {
        successMessage.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        /* form.reset(); */
      } else {
        throw new Error("Hubo un problema al publicar tu comentario.");
      }
    } catch (error) {
        console.log("🦝Error",error)
      successMessage.classList.add("hidden");
      errorMessage.classList.remove("hidden");
      errorMessage.textContent = error.message || "Error desconocido.";
    }
  });
});
