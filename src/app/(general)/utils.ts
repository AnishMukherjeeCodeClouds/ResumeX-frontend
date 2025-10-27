import { cookies } from "next/headers";
import wretch from "wretch";

export async function API() {
  const SERVER = process.env.SERVER_URL ?? "http://localhost:5000";
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token");

  const api = wretch(SERVER);

  return token
    ? api.headers({
        cookie: `access-token=${token.value}`,
      })
    : api;
}
