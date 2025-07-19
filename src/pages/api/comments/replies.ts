import type { APIRoute } from "astro";
import { getRepliesByCommentId } from "@src/services/comments";
import postComment from "@src/services/postComment";
import { isLoggedIn } from "@src/services/auth";
import { sanitizeHtml } from "@src/utils/sanatizeHtml";

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("commentId") || undefined;

  if (!id)
    return new Response(JSON.stringify({ message: "No id provided" }), {
      status: 400,
    });

  const replies = await getRepliesByCommentId(id);

  return new Response(JSON.stringify({ replies }), { status: 200 });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const cookiesExist = cookies.get("accessToken");
  const formData = await request.formData();

  const postId = formData.get("postId") || null;
  const commentOn = postId
    ? parseInt(atob(postId as string).split(":")[1])
    : null;

  let commentId = formData.get("parentId") || null;
  const parentId = commentId ? parseInt(commentId as string) : null;

  const rawContent = formData.get("content") || null;
  const content = rawContent ? sanitizeHtml(rawContent as string) : null;

  const author = formData.get("author") || null;
  const email = formData.get("authorEmail") || null;
  const website = formData.get("authorUrl") || null;

  let input = {
    author: author,
    authorUrl: website,
    commentOn: commentOn,
    content: content,
    parent: parentId,
    authorEmail: email,
  };
  const dataUserLogged = isLoggedIn(cookies);
  if (cookiesExist && dataUserLogged) {
    input = {
      author: dataUserLogged.name,
      authorUrl: dataUserLogged.website,
      commentOn: commentOn,
      content: content,
      authorEmail: dataUserLogged.email,
      parent: parentId,
    };
  }
  try {
    await postComment(input);
    return new Response(
      JSON.stringify({
        message: "Comment posted successfully",
        data: input,
      }),
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
