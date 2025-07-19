import type { APIRoute } from "astro";
import Jwt from "jsonwebtoken";
import { isValidUser } from "@src/services/auth";

const { SECRET_KEY } = import.meta.env;

const ERRORS = {
  missingFields: "missing_fields",
  invalidCredentials: "invalid_credentials",
};

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const cookiesExist = cookies.get("accessToken");
  const user = (formData.get("username") as string) || undefined;
  const password = (formData.get("password") as string) || undefined;

  if (cookiesExist) return redirect("/dashboard");

  if (!user || !password)
    return redirect(`/login?error=true&message=${ERRORS.missingFields}`);

  const data = await isValidUser(user, password);

  if (!data)
    return redirect(`/login?error=true&message=${ERRORS.invalidCredentials}`);

  const token = Jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });

  cookies.set("accessToken", token, { path: "/", httpOnly: true });

  return redirect("/dashboard");
};

