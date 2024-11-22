
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, SquarePen, ListFilter } from "lucide-react"
import { Doc } from "../../../../convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { Hint } from "@/components/hint"
import PreferencesModal from "./preferences-modal"
import { useState } from "react"
import InviteModal from "./_components/invite-modal"

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">
  isAdmin: boolean
}

export const WorkspaceHeader = ({
  workspace,
  isAdmin
}: WorkspaceHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [prefOpen,setPrefOpen] = useState(false);
  const [openInvite,setOpenInvite] = useState(false);

  return (
    <>
    <InviteModal 
      open={openInvite}  
      setOpen={setOpenInvite}
      name={workspace?.name}
      joinCode={workspace?.joinCode}
    />
    <PreferencesModal  open={prefOpen} setOpen={setPrefOpen} initialValue={workspace.name}  />
    <div className="flex items-center justify-between px-3 h-12">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-9 px-2 hover:bg-white/10"
          >
            <span className="flex items-center gap-2 text-white">
              <span className="text-xl font-bold ">{workspace?.name}</span>
              <ChevronDown className={cn("h-5 w-5 opacity-50 text-white", open ? "rotate-180" : "")} />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem className="py-2 hover:bg-sky-700 hover:text-white">
            <div className="flex flex-col gap-0.5  ">
              <div className="flex gap-x-2">
              <div className="w-7 h-7 rounded bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <p className="font-medium mt-1 ">{workspace.name}</p>
              </div>
              <p className="text-xs text-muted-foreground">Active workspace</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isAdmin && (
            <>
              <DropdownMenuItem 
                className="hover:bg-sky-700 hover:text-white" 
                onClick={() => setOpenInvite(true)}
              >
                {/* <Share className="mr-2 h-4 w-4" /> */}
                <span>Invite People to Code test</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="hover:bg-sky-700 hover:text-white"
                onClick={() => setPrefOpen(true)}
              >
                {/* <Prefrenc className="mr-2 h-4 w-4" /> */}
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem className="4 hover:bg-red-500 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex item-center text-white gap-0.5">
          <Hint label="Filter conversation" side="bottom" >
            <Button variant="ghost" size="sm" >
              <ListFilter className="size-4 text-white" />
            </Button>
          </Hint>
          <Hint label="New message" side="bottom">
            <Button variant="ghost" size="sm" >
              <SquarePen className="size-4 text-white" />
            </Button>
          </Hint>
      </div>
    </div>
    </>
  )
}