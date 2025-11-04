"use client";

import { useAuth } from "@/app/(general)/(protected)/_context/AuthContext";
import { signupAction } from "@/app/auth/actions";
import { SignupSchema } from "@/app/auth/schema";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import React, { useCallback } from "react";
import { FieldError, useForm, useWatch } from "react-hook-form";
import ReactPasswordChecklist from "react-password-checklist";
import { toast } from "sonner";
import z from "zod";

function registerError(error: FieldError | undefined) {
  if (!error) return;

  toast.error(error.message, {
    className: "!text-lg",
  });
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
    mode: "onSubmit",
  });

  const {
    name: nameError,
    password: passwordError,
    username: usernameError,
    email: emailError,
    confirmPassword: confirmPasswordError,
  } = form.formState.errors;
  const data = useWatch({ control: form.control });

  registerError(nameError);
  registerError(passwordError);
  registerError(usernameError);
  registerError(emailError);
  registerError(confirmPasswordError);

  const { updateAuthState } = useAuth();

  const onSubmit = useCallback(async (data: z.infer<typeof SignupSchema>) => {
    const res = await signupAction(data);
    if (!res.success)
      toast.error(res.message, {
        className: "!text-lg",
      });
    else {
      toast.success(res.message, {
        className: "!text-lg",
      });
      await updateAuthState();
      redirect("/dashboard", RedirectType.replace);
    }
  }, []);

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
        <FormInput
          control={form.control}
          label="Name"
          placeholder="E.g. Harry"
          name={"name"}
        />
        <FormInput
          control={form.control}
          label={"Username"}
          placeholder="E.g. Harry02"
          name={"username"}
        />
        <FormInput
          control={form.control}
          label={"Email"}
          placeholder="E.g. harry@mail.com"
          name={"email"}
        />
        <FormInput
          control={form.control}
          label={"Password"}
          placeholder="E.g. Abcdefgh@12"
          name={"password"}
          type="password"
        />
        <ReactPasswordChecklist
          className="!mb-6"
          rules={[
            "minLength",
            "maxLength",
            "lowercase",
            "capital",
            "number",
            "specialChar",
            "match",
          ]}
          minLength={8}
          maxLength={128}
          value={data.password ?? ""}
          valueAgain={data.confirmPassword}
        />
        <FormInput
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
