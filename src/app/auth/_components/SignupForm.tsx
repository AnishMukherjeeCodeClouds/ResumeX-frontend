"use client";

import InputOverlappingLabelDemo from "@/components/shadcn-studio/input/input-23";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { Control, Controller, FieldError, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const SignupSchema = z
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

function registerError(error: FieldError | undefined) {
  if (!error) return;

  toast.error(error.message, {
    className: "!text-lg",
  });
}

function FormField({
  control,
  name,
  label,
  className,
  ...props
}: {
  control: Control<
    z.infer<typeof SignupSchema>,
    any,
    z.infer<typeof SignupSchema>
  >;
  label: string;
  name: keyof z.infer<typeof SignupSchema>;
} & Omit<React.ComponentProps<"input">, "name">) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <InputOverlappingLabelDemo
            label={label}
            className="md:!text-lg md:!py-6 md:!px-5 border-gray-400"
            labelClassName="md:!text-base md:!left-4"
            {...field}
            {...props}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}

export function SignupForm() {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const {
    name: nameError,
    password: passwordError,
    username: usernameError,
    email: emailError,
    confirmPassword: confirmPasswordError,
    root: rootError,
  } = form.formState.errors;

  registerError(nameError);
  registerError(passwordError);
  registerError(usernameError);
  registerError(emailError);
  registerError(confirmPasswordError);

  const onSubmit = (data: z.infer<typeof SignupSchema>) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-5 md:w-full lg:w-auto bg-transparent"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="text-center lg:text-left space-y-3 lg:space-y-5 lg:mb-4">
        <p className="text-3xl font-semibold lg:text-5xl">Sign up</p>
        <p className="text-gray-600 md:text-lg lg:text-2xl">
          Create an account to start making resumes
        </p>
      </div>
      <div className="space-y-4">
        <FormField
          control={form.control}
          label="Name"
          placeholder="E.g. Harry"
          name={"name"}
        />
        <FormField
          control={form.control}
          label={"Username"}
          placeholder="E.g. Harry02"
          name={"username"}
        />
        <FormField
          control={form.control}
          label={"Email"}
          placeholder="E.g. harry@mail.com"
          name={"email"}
        />
        <FormField
          control={form.control}
          label={"Password"}
          placeholder="E.g. Abcdefgh@12"
          name={"password"}
          type="password"
        />
        <FormField
          control={form.control}
          label={"Confirm Password"}
          placeholder="Enter the same password as above"
          name={"confirmPassword"}
          type="password"
        />
      </div>
      <Button
        type="submit"
        className="text-lg rounded-lg md:py-6 lg:text-xl bg-[#27407e]"
      >
        Sign up
      </Button>
      <p className="text-center">
        Already have an account?{" "}
        <Link
          className="cursor-pointer text-blue-900 hover:underline"
          href="/auth/login"
        >
          Click here
        </Link>
      </p>
    </form>
  );
}
