export function commentsController() {
    const comments = document.getElementById("post");

  comments.addEventListener("click", (event) => {
    let target = event.target;
    if (target.tagName === "BUTTON" && target.dataset.commentid) {
      console.log("Reply button clicked");
      let commentId = target.dataset.commentid;
      const form = document.getElementById("comment-form");
      (form.querySelector("input[name='parentId']") ).value = commentId;
      let textarea = form.querySelector("textarea[name='content']");
      textarea.value = `@${target.dataset.commentAuthor} `;
      textarea.focus();
    }
  })
}
