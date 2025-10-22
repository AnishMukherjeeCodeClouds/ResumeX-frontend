"use client";

import { FormField } from "@/app/auth/_components/FormField";
import { loginAction } from "@/app/auth/actions";
import { LoginSchema } from "@/app/auth/schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import React, { useCallback } from "react";
import { FieldError, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function registerError(error: FieldError | undefined) {
  if (!error) return;

  toast.error(error.message, {
    className: "!text-lg",
  });
}

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      // username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { password: passwordError, email: emailError } = form.formState.errors;

  registerError(passwordError);
  registerError(emailError);

  const onSubmit = useCallback(async (data: z.infer<typeof LoginSchema>) => {
    const res = await loginAction(data);
    if (!res.success)
      toast.error(res.message, {
        className: "!text-lg",
      });
    else {
      toast.success(res.message, {
        className: "!text-lg",
      });
      redirect("/", RedirectType.replace);
    }
  }, []);

  return (
    <form
      className="flex flex-col gap-5 md:w-full lg:w-auto bg-transparent"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="text-center lg:text-left space-y-3 lg:space-y-5 lg:mb-4">
        <p className="text-3xl font-semibold lg:text-5xl">Log in</p>
        <p className="text-gray-600 md:text-lg lg:text-2xl">
          Log in to continue building your resumes
        </p>
      </div>
      <div className="space-y-4">
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
      </div>
      <Button
        type="submit"
        className="text-lg rounded-lg md:py-6 lg:text-xl bg-[#27407e]"
      >
        Log in
      </Button>
      <p className="text-center">
        Don't have an account?{" "}
        <Link
          className="cursor-pointer text-blue-900 hover:underline"
          href="/auth/signup"
        >
          Click here
        </Link>
      </p>
    </form>
  );
}
