"use server";

import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";
import { LoginFormSchema } from "../types/loginFormschema";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

async function login(
  prevState: { error: undefined | string },
  formData: FormData
) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return { error: fieldErrors.email?.[0] || fieldErrors.password?.[0] };
  }
  const { email, password } = validatedFields.data;
  try {
    const response = await axios.post(
      `${process.env.API_URL}/token/student/create`,
      { email, password }
    );
    const token = response.data.data;
    cookies().set({
      name: "accessToken",
      value: token.accessToken,
      httpOnly: true,
      path: "/",
    });
    cookies().set({
      name: "refreshToken",
      value: token.refreshToken,
      httpOnly: true,
      path: "/",
    });
  } catch (error: any) {
    return { error: error?.response?.data.data.message || "server error" };
  }
  revalidatePath("/student");
  redirect("/student");
}

async function logout() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  revalidatePath("/login");
  redirect("/login");
}

export { login, logout };
