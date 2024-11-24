import UserButton from "@/app/features/auth/components/user-Button"
import WorkspaceSwitcher from "./Workspace-Switcher"
import { SidebarButton } from "./sidebar-button"
import { Bell, Home, MessageSquare, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export const Sidebar = () =>{
    return(
        <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4  items-center pt-[9px] pb-4" >
            <WorkspaceSwitcher />
            <div className="gap-y-3">
                <SidebarButton icon={Home} label="Home" isActive  />
                <SidebarButton icon={MessageSquare} label="DMs" isActive={false}  />
                <SidebarButton icon={Bell} label="Activity" isActive={false}  />
            </div>
            
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto  ">
                <Button className="bg-gray-500/50 rounded-full mb-2 p-2 py-3" >
                    <Plus className="size-7" />
                </Button>
                <UserButton />
            </div>
        </aside>
    )
} 