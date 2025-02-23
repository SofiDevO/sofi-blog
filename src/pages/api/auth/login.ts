import type { APIRoute } from "astro";
import Jwt from 'jsonwebtoken';
import { isValidUser } from "@src/services/auth";
export const prerender = true;

const { SECRET_KEY } = import.meta.env;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
    const cookiesExist = cookies.get("accessToken");

    if (cookiesExist) return redirect("/dashboard");

    const user = (formData.get("username") as string) || undefined;
    const password = (formData.get("password") as string) || undefined;

    if (!user || !password) return redirect("/login?error=true&message=Please fill in all fields.");

    const data = await isValidUser(user, password);
    if (!data) return redirect("/login?error=true&message=Invalid Credentials.");

    const token = Jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
    cookies.set("accessToken", token, { path: "/" });

    return redirect("/dashboard");
}