import UserButton from "@/app/features/auth/components/user-Button"
import WorkspaceSwitcher from "./Workspace-Switcher"

export const Sidebar = () =>{
    return(
        <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4" >
            <WorkspaceSwitcher />
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto ">
                <UserButton />
            </div>
        </aside>
    )
} 