import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
          "Password must contain at least one uppercase letter, one digit, one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
          "Password must contain at least one uppercase letter, one digit, one special character",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
