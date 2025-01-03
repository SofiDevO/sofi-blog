import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("accessToken", { path: "/" });
  return redirect("/login");
};