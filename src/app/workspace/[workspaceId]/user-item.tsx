import { Button } from "@/components/ui/button"
import { Id } from "../../../../convex/_generated/dataModel"
import { cva , type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import workspaceId from "./page";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const userItemVariants = cva(
    "flex item-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
    {
        variants:{
            variant:{
                default: "text-[#f9edffcc]",
                active: "text-[#481349] bg-white/90 hover:bg-white-/90"
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
)

interface UserItemProps{
    id: Id<"members">;
    label?: string;
    image?: string;
    variant?: VariantProps<typeof userItemVariants>["variant"];
}

export const UserItem = ({
    id,
    label = "Member",
    image,
    variant
}: UserItemProps ) => {

    const avatarfallback = label.charAt(0);

    return(
        <Button
            variant="transparent"
            className={cn(userItemVariants({ variant }))}
            size="sm"
            asChild
        >
            <Link href={`workspace/${workspaceId}/member/${id}`}>
                <Avatar className="size-5 rounded-md mr-1">
                    <AvatarImage className="rounded-md" src={image} />
                    <AvatarFallback className="rounded-md bg-purple-600 text-white text-sm">
                        {avatarfallback}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm truncate" >{label}</span>
            </Link>
        </Button>
    )   
}