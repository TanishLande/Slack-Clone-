"use client"
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";


export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/auth");
    signOut();
  }

  return (
    <div>
      This is main home page
      <Button onClick={handleSignOut}>
        Sign Out  
      </Button>
    </div>
  );
}
