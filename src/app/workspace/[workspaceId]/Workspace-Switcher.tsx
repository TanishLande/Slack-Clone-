// import { useGetWorkspace } from "@/app/features/workspace/api/use-get-workspace";
// import { useGetWorkspaces } from "@/app/features/workspace/api/use-get-workspaces";
// import { useCreateWorkSpaceModal } from "@/app/features/workspace/store/use-create-workspace-modal";
// import { useWorkspaceId } from "@/app/hooks/use-workspace-id"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
// import { Loader, Plus } from "lucide-react";
// import { useRouter } from "next/navigation";


// const WorkspaceSwitcher = () =>{
//   const workspaceId =  useWorkspaceId();
//   const router = useRouter();
//   const [_open,setOpen] = useCreateWorkSpaceModal();

//   const { data: workspaces  } = useGetWorkspaces();
//   const  { data: workspace , isLoading: workSpaceLoading } = useGetWorkspace( { id: workspaceId })

//   const filteredWorkspaces = workspaces?.filter(
//     (workspace) => workspace?._id != workspaceId
//   )
//   return (
//     <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//             <Button className="size-9 relative overflow-hidden bg-[#a94fa8] hover:bg-[#ABABA] text-white font-semibold text-lg">
//                 {workSpaceLoading ? (
//                   <Loader className="size-5 animate-spin shrink-0" />
//                 ) : (
//                   workspace?.name.charAt(0).toUpperCase()
//                 )}
//             </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side="bottom" align="start" className="w-64 gap-y-2 bg-white mt-1 rounded-sm p-2 ml-6">
//                 <DropdownMenuItem
//                   onClick={() => { router.push(`/workspace/${workspaceId}`) }}
//                   className="cursor-pointer mb-2 flex flex-col  justify-start items-start capitalize"
//                 >
//                   {workspace?.name}
//                   <span className="text-sm text-muted-foreground">
//                     Active workspace
//                   </span>
//                 </DropdownMenuItem>
//                 {filteredWorkspaces?.map((workspace) => (
//                   <DropdownMenuItem
//                     key={workspace?._id}
//                     className="cursor-pointer capitalize flex gap-x-2 "
//                     onClick={() => { router.push(`/workspace/${workspace?._id}`) }}
//                   >
//                     <div className="size-9  relative overflow-hidden flex pt-1 rounded-md  justify-center align-center bg-[#ABABAB] text-white font-semibold text-lg" >
//                       {workspace?.name.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="mt-1.5">
//                     <p className="truca" >{workspace?.name}</p>
//                     </div>
                    
//                   </DropdownMenuItem>
//                 ))}
//                 <DropdownMenuItem
//                   className="cursor-pointer flex"
//                   onClick={() => { setOpen(true) }}
//                 >
//                   <div className= "size-9 rounded-md mt-2 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg flex item-center justify-center mr-2">
//                     <Plus  className="mt-1 rounded-lg" />
//                   </div>
//                  <div className="mt-2">
//                  Create a new Workspace
//                  </div>
//                 </DropdownMenuItem>
//         </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// export default WorkspaceSwitcher

'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { Check, Loader, Plus } from "lucide-react"
import { useGetWorkspace } from "@/app/features/workspace/api/use-get-workspace"
import { useGetWorkspaces } from "@/app/features/workspace/api/use-get-workspaces"
import { useCreateWorkSpaceModal } from "@/app/features/workspace/store/use-create-workspace-modal"
import { useWorkspaceId } from "@/app/hooks/use-workspace-id"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function WorkspaceSwitcher() {
  const [open, setOpen] = React.useState(false)
  const workspaceId = useWorkspaceId()
  const router = useRouter()
  const [_, setOpenCreateModal] = useCreateWorkSpaceModal()

  const { data: workspaces } = useGetWorkspaces()
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })

  const filteredWorkspaces = workspaces?.filter((w) => w?._id !== workspaceId) || []

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          className="size-9 relative overflow-hidden bg-[#a94fa8] hover:bg-[#ABABA] text-white font-semibold text-lg"
          aria-label="Select workspace"
        >
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 ml-12">
        <Command>
          <CommandInput placeholder="Search workspace..." />
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup heading="Current workspace">
              <CommandItem
                onSelect={() => {
                  router.push(`/workspace/${workspaceId}`)
                  setOpen(false)
                }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center w-full">
                  <Check className={cn(
                    "mr-2 h-4 w-4",
                    workspaceId === workspace?._id ? "opacity-100" : "opacity-0"
                  )} />
                  {workspace?.name}
                </div>
                <span className="text-sm text-muted-foreground ml-6">
                  Active workspace
                </span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Other workspaces">
              {filteredWorkspaces.map((w) => (
                <CommandItem
                  key={w?._id}
                  onSelect={() => {
                    router.push(`/workspace/${w?._id}`)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-9 relative overflow-hidden flex items-center justify-center rounded-md bg-[#ABABAB] text-white font-semibold text-lg">
                      {w?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="capitalize">{w?.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpenCreateModal(true)
                  setOpen(false)
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-md relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg flex items-center justify-center">
                    <Plus className="size-5" />
                  </div>
                  <span>Create a new Workspace</span>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}