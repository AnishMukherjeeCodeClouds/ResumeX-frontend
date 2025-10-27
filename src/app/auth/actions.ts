"use server";

import { LoginSchema, ReturnSchema, SignupSchema } from "@/app/auth/schema";
import { cookies } from "next/headers";
import wretch from "wretch";
import z from "zod";

const SERVER = process.env.SERVER_URL ?? "http://localhost:5000";
const authApi = wretch(`${SERVER}/auth`);

export async function signupAction(signupPayload: unknown) {
  try {
    const parseResult = SignupSchema.safeParse(signupPayload);
    if (!parseResult.success)
      return {
        success: false,
        message: "Validation failed",
      };

    const payload = parseResult.data;

    const res = await authApi
      .post(payload, "/signup")
      .json<z.infer<typeof ReturnSchema>>()
      .then(({ accessToken, refreshToken }) => ({
        accessToken,
        refreshToken,
      }));

    const cookieStore = await cookies();
    cookieStore
      .set("access-token", res.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 30,
      })
      .set("refresh-token", res.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });

    return {
      success: true,
      message: "Signed up successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: JSON.parse((error as Error).message).message,
    };
  }
}

export async function loginAction(loginPayload: unknown) {
  try {
    const parseResult = LoginSchema.safeParse(loginPayload);
    if (!parseResult.success)
      return {
        success: false,
        message: "Validation failed",
      };

    const payload = parseResult.data;

    const res = await authApi
      .post(payload, "/login")
      .json<z.infer<typeof ReturnSchema>>()
      .then(({ accessToken, refreshToken }) => ({
        accessToken,
        refreshToken,
      }));

    const cookieStore = await cookies();
    cookieStore
      .set("access-token", res.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 30,
        path: "/",
      })
      .set("refresh-token", res.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

    return {
      success: true,
      message: "Logged in successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: JSON.parse((error as Error).message).message,
    };
  }
}
