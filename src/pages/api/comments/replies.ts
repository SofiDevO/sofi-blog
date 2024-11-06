import type { APIRoute } from "astro";
import { getRepliesByCommentId } from "@src/services/comments";
export const prerender = false;

export const GET: APIRoute = async ({ params, url }) => {
    const id = url.searchParams.get("commentId") || undefined;
    console.log(url)
    if (!id) return new Response(JSON.stringify({message: "No id provided"}), { status: 400 });

    const replies = await getRepliesByCommentId(id);

    return new Response(JSON.stringify({replies: replies}), { status: 200 });
}