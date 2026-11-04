"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_COOKIE_MAX_AGE,
  checkAdminPassword,
  createSessionToken,
} from "@/lib/admin-session";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin/productos");

  if (!process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=no-config");
  }

  const isValid = await checkAdminPassword(password);
  if (!isValid) {
    redirect(`/admin/login?error=invalid&from=${encodeURIComponent(from)}`);
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: "/",
  });

  redirect(from.startsWith("/admin") ? from : "/admin/productos");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
