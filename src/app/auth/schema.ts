import z from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string("Name is required")
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(255, "Name must be at most 255 characters long"),
    username: z
      .string("Username is required")
      .trim()
      .min(3, "Username must be at least 3 characters long")
      .max(30, "Username must be at most 30 characters long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      )
      .toLowerCase(),
    email: z
      .email("Email is required")
      .max(254, "Email must be at most 254 characters long")
      .trim()
      .toLowerCase(),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must be at most 128 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z
      .string("Confirm password is required")
      .min(8, "Confirm password must be at least 8 characters long")
      .max(128, "Confirm password must be at most 128 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const LoginSchema = z.object({
  email: z
    .email("Email is required")
    .max(254, "Email must be at most 254 characters long")
    .trim()
    .toLowerCase(),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export const ReturnSchema = z.object({
  message: z.string(),
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
  statusCode: z.int(),
});
