"use client"

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

import UserButton from "./features/auth/components/user-Button";


export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/auth");
    signOut();
  }

  return (
    <div className="flex">
      <UserButton />
    </div>
  );
}
