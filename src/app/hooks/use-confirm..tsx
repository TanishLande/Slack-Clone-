import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<boolean>] => {
  // Store the promise resolver function
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  // Creates a new promise when confirmation is needed
  const confirm = () => 
    new Promise<boolean>((resolve) => {
      setPromise({ resolve })
    })

  // Reset the promise state
  const handleClose = () => {
    setPromise(null)
  }

  // Handle cancel button click
  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  // Handle confirm button click
  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  // The actual dialog component
  const ConfirmDialog = () => (
    <Dialog open={promise !== null} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmDialog, confirm]
}