import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "../hooks/use-current-hooks";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
  

const UserButton = () => {
    const { signOut } = useAuthActions();

    const router = useRouter();
    const { data, isLoading } = useCurrentUser();

    if(isLoading) {
        return(
            <Loader className=" size-4 animate-spin text-muted-foreground " />
        )
    };

    if(!data){
        return null
    }

    const { name , image } = data;

    const avatarFallback = name!.charAt(0).toUpperCase();

    const handleSignOut = () => {
        signOut();
        router.push("/auth");
    }

  return (
    <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="outline-none relative h-8 w-8">
            <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage alt ={name} src={image} />
                <AvatarFallback className="bg-purple-600 text-white">
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right" className="w-56">
            <DropdownMenuItem onClick={handleSignOut} >
                <LogOut className="size-4 mr-2" />
                Log Out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
