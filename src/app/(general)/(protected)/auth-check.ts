"use server";

import { cookies } from "next/headers";
import z from "zod";

export async function checkAuthenticated() {
  const cookieStore = await cookies();

  // If access token is present, then authenticated
  const accessToken = cookieStore.get("access-token");
  return (
    accessToken != undefined && z.jwt().safeParse(accessToken.value).success
  );
}
