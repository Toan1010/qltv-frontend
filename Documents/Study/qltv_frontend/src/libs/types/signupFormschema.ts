import { z } from "zod";

export const SignupFormSchema = z
  .object({
    firstname: z.string().min(1, { message: "First name must not be empty." }),
    lastname: z.string().min(1, { message: "Last name must not be empty." }),
    phone: z.string().min(1, { message: "Phone number must not be empty." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    repassword: z
      .string()
      .min(0, { message: "Password confirmation must not be empty." }),
  })

