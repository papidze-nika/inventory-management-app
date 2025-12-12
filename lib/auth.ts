import { stackServerApp } from "@/stack/server";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  // Stack stores auth in cookies. Because the cookie access happens inside the Stack SDK,
  // Next may treat this function as cacheable and serve a stale "not logged in" result.
  // Opt out of caching + touch cookies() so the request is always dynamic.
  noStore();
  cookies();

  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return user;
}
