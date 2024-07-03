"use server";

import axios from "axios";
import { ForgotPassword, ResetPassword } from "@/libs/types/loginFormschema";
import { error } from "console";

export async function sendRequset(
  prevState: { error: undefined | string },
  formData: FormData
) {
  const validatedFields = ForgotPassword.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }
  const { email } = validatedFields.data;

  try {
    const response = await axios.post(
      `${process.env.API_URL}/student/forgot-password`,
      { email }
    );
    return { message: "Check your email to change your password!" };
  } catch (error) {
    console.log(error);

    return { error: "Server error" };
  }
}

export async function resetPassword(
  prevState: { error: undefined | string },
  formData: FormData
) {
  console.log(formData.get("repassword"), formData.get("reset_string"));

  const validatedFields = ResetPassword.safeParse({
    reset_string: formData.get("reset_string"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
  });
  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }
  try {
    const { reset_string, password } = validatedFields.data;
    await axios.post(
      `${process.env.API_URL}/student/forgot-password/${reset_string}`,
      { password: password }
    );
    return { message: "Change password successfully" };
  } catch (error: any) {
    let error_string = error.response.data.data.error;
    // console.log(error.response.data.data.error);
    return { error: error_string || "Server error" };
  }
}
