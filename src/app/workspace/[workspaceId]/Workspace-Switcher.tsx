import { useGetWorkspace } from "@/app/features/workspace/api/use-get-workspace";
import { useGetWorkspaces } from "@/app/features/workspace/api/use-get-workspaces";
import { useCreateWorkSpaceModal } from "@/app/features/workspace/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";


const WorkspaceSwitcher = () =>{
  const workspaceId =  useWorkspaceId();
  const router = useRouter();
  const [_open,setOpen] = useCreateWorkSpaceModal();

  const { data: workspaces , isLoading: workSpacesLoading } = useGetWorkspaces();
  const  { data: workspace , isLoading: workSpaceLoading } = useGetWorkspace( { id: workspaceId })

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace?._id != workspaceId
  )
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button className="size-9 relative overflow-hidden bg-[#ABABAB] hiver:bg-[#ABABA] text-slate-800 font-semibold text-lg">
                {workSpaceLoading ? (
                  <Loader className="size-5 animate-spin shrink-0" />
                ) : (
                  workspace?.name.charAt(0).toUpperCase()
                )}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64 gap-y-2 bg-white mt-1 rounded-sm p-2 ml-6">
                <DropdownMenuItem
                  onClick={() => { router.push(`/workspace/${workspaceId}`) }}
                  className="cursor-pointer mb-2 flex flex-col  justify-start items-start capitalize"
                >
                  {workspace?.name}
                  <span className="text-sm text-muted-foreground">
                    Active workspace
                  </span>
                </DropdownMenuItem>
                {filteredWorkspaces?.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace._id}
                    className="cursor-pointer capitalize flex gap-x-2 "
                    onClick={() => { router.push(`/workspace/${workspace._id}`) }}
                  >
                    <div className="size-9  relative overflow-hidden flex pt-1 rounded-md  justify-center align-center bg-[#616061] text-white font-semibold text-lg" >
                      {workspace.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="mt-1.5">
                    {workspace.name}
                    </div>
                    
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  className="cursor-pointer flex"
                  onClick={() => { setOpen(true) }}
                >
                  <div className= "size-9 rounded-md mt-2 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg flex item-center justify-center mr-2">
                    <Plus  className="mt-1 rounded-lg" />
                  </div>
                 <div className="mt-1.5">
                 Create a new Workspace
                 </div>
                </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspaceSwitcher
