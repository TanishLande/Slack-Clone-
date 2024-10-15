import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useCreateWorkSpaceModal } from "../store/use-create-workspace-modal";
  
  export const CreateWorkspaceModal = () =>{
    const [open, setOpen] = useCreateWorkSpaceModal();

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
    
  }