import { registerUser } from "@src/services/auth";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const user = (formData.get("username") as string) || undefined;
  const password = (formData.get("password") as string) || undefined;
  const email = (formData.get("email") as string) || undefined;
  const firstName = (formData.get("firstName") as string) || undefined;
  const lastName = (formData.get("lastName") as string) || undefined;

  if (!user || !password || !email || !firstName || !lastName)
    return redirect("/register?error=missing-fields");
  // añadir validaciones de email y password

  const data = await registerUser({
    username: user,
    password,
    email,
    firstName,
    lastName,
  });

  if (!data) return redirect("/register?error=invalid-credentials");

  return redirect("/login?success=registered");
};
