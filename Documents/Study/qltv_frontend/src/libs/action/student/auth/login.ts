"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { LoginFormSchema } from "@/libs/types/loginFormschema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function login(
  prevState: { error: undefined | string },
  formData: FormData
) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
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
