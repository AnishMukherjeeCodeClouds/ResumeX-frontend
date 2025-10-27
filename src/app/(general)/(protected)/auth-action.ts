"use server";

import { checkAuthenticated } from "@/app/(general)/(protected)/auth-check";
import { ReturnSchema } from "@/app/auth/schema";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import wretch from "wretch";
import z from "zod";

const SERVER = process.env.SERVER_URL ?? "http://localhost:5000";
const authApi = wretch(`${SERVER}/auth`);

async function refreshAccessToken(refreshToken: unknown) {
  z.jwt().parse(refreshToken);

  const tokens = await authApi
    .url("/refresh")
    .post({ refreshToken })
    .json<z.infer<typeof ReturnSchema>>()
    .then(({ accessToken, refreshToken }) => ({
      accessToken,
      refreshToken,
    }));

  const cookieStore = await cookies();
  cookieStore
    .set("access-token", tokens.accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 30,
      path: "/",
    })
    .set("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

  return await extractUserDataFromToken(tokens.accessToken);
}

async function extractUserDataFromToken(token: unknown) {
  const accessToken = z.jwt().parse(token);

  const UserReturnSchema = z.object({
    message: z.string(),
    userDetails: z.object({
      id: z.string(),
      name: z.string(),
      email: z.email(),
    }),
    statusCode: z.enum(StatusCodes),
  });

  const { userDetails } = await authApi
    .url("/me")
    .headers({ cookie: `access-token=${accessToken}` })
    .get()
    .json<z.infer<typeof UserReturnSchema>>()
    .then((data) => data);

  return userDetails;
}

export async function ensureAuthenticated() {
  const isAuthenticated = await checkAuthenticated();

  const cookieStore = await cookies();

  if (isAuthenticated) {
    try {
      return extractUserDataFromToken(cookieStore.get("access-token")!.value);
    } catch {
      redirect("/auth/login", RedirectType.replace);
    }
  } else {
    // If access token is not there, then check refresh token
    const refreshToken = cookieStore.get("refresh-token");

    // If refresh token is not there, redirect to login
    if (!refreshToken) redirect("/auth/login", RedirectType.replace);

    try {
      // If refresh token is present, then refresh the access token
      return await refreshAccessToken(refreshToken.value);
    } catch {
      redirect("/auth/login", RedirectType.replace);
    }
  }
}
