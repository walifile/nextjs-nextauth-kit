"use client";
// Remember you must use an AuthProvider for
// client components to useSession
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ClientPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  console.log(session, "client session");
  if (status === "authenticated") {
    return <button onClick={() => signOut()}>Logout</button>;
  }
  return (
    <section className="flex flex-col gap-6">
      {session && session?.user.name} hello client
    </section>
  );
}
