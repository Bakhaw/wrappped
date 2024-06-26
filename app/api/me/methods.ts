import { signOut } from "next-auth/react";

import { FullUser } from "@/types";

export async function getWrapped() {
  const res = await fetch("/api/me");
  const json = (await res.json()) as FullUser;

  if (res.status === 404) {
    signOut({ callbackUrl: "/sign-in" });
  }

  return json.wrapped;
}

export async function deleteAccount() {
  const res = await fetch("/api/me", { method: "DELETE" });
  const json = await res.json();

  if (res.status === 200) {
    signOut({ callbackUrl: "/sign-in" });
  }

  return json;
}
