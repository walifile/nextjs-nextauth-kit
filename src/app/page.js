"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";
export default function Home() {
  const { data: session, status, ...rest } = useSession();
  console.log(session, "session");
  console.log(status, "session");
  if (status === "loading") {
    return <p>Loading....</p>;
  }
  if (status === "authenticated") {
    return <button onClick={() => signOut("google")}>Logout</button>;
  }
  // if (status === "unauthenticated") {
  //   return <p>user un authenticated</p>;
  // }
  return (
    <>
      {/* <Image
        src="/assets/svg/google.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
        onClick={async () => {
          await signIn("google");
        }}
      /> */}
      <SignUp />
      <SignIn />
    </>
  );
}
