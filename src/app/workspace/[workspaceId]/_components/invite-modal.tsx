import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CopyIcon, RefreshCcw } from "lucide-react";
import workspaceId from "../page";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { toast } from "sonner";
import { useNewJoinCode } from "@/app/features/workspace/api/use-new-joincode";
import { DialogClose } from "@radix-ui/react-dialog";
import { useConfirm } from "@/app/hooks/use-confirm.";

interface InviteModalProps { 
    open: boolean;
    setOpen: (open: boolean) => void;
    name:string;
    joinCode: string;
}

const InviteModal = ({
    open,
    setOpen,
    name,
    joinCode
}: InviteModalProps ) => {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "Deleting your current Join code is not reversable"
  )
  const { mutate, isPending } = useNewJoinCode();

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite link copied."))
  }

  const handleNewCode = async () => {
    const ok = await confirm();

    if(!ok) return;

    mutate({workspaceId}, {
      onSuccess: () => {
        toast.success("Invite code regenerated.");
      },
      onError: () => {
        toast.error("Failed to Generate code.")
      }
    })
  }  

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen} >
          <DialogContent>
              <DialogHeader>
                <DialogTitle >
                  Invite people to your workspace
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-y-4 items-center justify-center py-10">
                <p className="text-4xl font-bold tracking-widest uppercase" >
                  {joinCode}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                >
                  Copy Link
                  <CopyIcon className="size-4 ml-2" />
                </Button>  
              </div>
              <div className="flex items-center justify-between w-full">
                <Button disabled={isPending} onClick={handleNewCode} variant="ghost"> 
                  New code
                  <RefreshCcw className="size-4 ml-2" />
                </Button>
                <DialogClose asChild>
                  <Button>
                    Close
                  </Button>
                </DialogClose>
              </div>
          </DialogContent>
      </Dialog>
    </>
  )
}

export default InviteModal
