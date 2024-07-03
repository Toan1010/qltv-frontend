"use server";

import axios from "axios";
import { SignupFormSchema } from "@/libs/types/signupFormschema";

export default async function signup(
  prevState: { error: undefined | string },
  formData: FormData
) {
  console.log(formData.get("repassword") == formData.get("password"));

  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  try {
    const { lastname, firstname, email, phone, password } =
      validatedFields.data;

    const newUser = await axios.post(`${process.env.API_URL}/student/`, {
      last_name: lastname,
      first_name: firstname,
      email,
      phone,
      password,
    });

    return { message: "Created new account! Please login to start borrow!" };
  } catch (err: any) {
    return { error: err?.response?.data.data.error || "Server error" };
  }
}
