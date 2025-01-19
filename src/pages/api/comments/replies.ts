import type { APIRoute } from "astro";
import { getRepliesByCommentId } from "@src/services/comments";
import postComment from "@src/services/postComment";
import { isLoggedIn } from "@src/services/auth";

export const prerender = false;

export const GET: APIRoute = async ({ params, url }) => {
    const id = url.searchParams.get("commentId") || undefined;
    console.log(url)
    if (!id) return new Response(JSON.stringify({message: "No id provided"}), { status: 400 });

    const replies = await getRepliesByCommentId(id);

    return new Response(JSON.stringify({replies: replies}), { status: 200 });
}

export const POST: APIRoute = async ({ params, request, cookies }) => {
    const cookiesExist = cookies.get("accessToken");
    const formData = await request.formData();
    const commentId = formData.get("commentId") || null;
    const content = formData.get("content") || null;
    const author = formData.get("author") || null;
    const email = formData.get("authorEmail") || null;
    const website = formData.get("authorUrl") || null;

    let input = {
        author: author,
        authorUrl: website,
        commentOn: 7,
        content: content,
        parent: commentId,
        authorEmail: email,
    }
    const dataUserLogged = isLoggedIn(cookies)
    if (cookiesExist && dataUserLogged) {
        input = {
            author: dataUserLogged.name,
            authorUrl: dataUserLogged.website,
            commentOn: 7,
            content: content,
            authorEmail: "",
            parent: commentId,
        }
    }
    try {
        const comment = await postComment(input);
        return new Response(JSON.stringify({comment: comment}), { status: 200 });
    }
    catch (e) {
        return new Response(JSON.stringify({message: e.message}), { status: 500 });
    }

}