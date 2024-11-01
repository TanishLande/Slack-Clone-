'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, AlertTriangle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useUpdateWorkspace } from '@/app/features/workspace/api/use-update-workspace'
import { useRemoveWorkspace } from '@/app/features/workspace/api/use-remove-workspace'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import { useWorkspaceId } from '@/app/hooks/use-workspace-id'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useConfirm } from '@/app/hooks/use-confirm.'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface PreferencesModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  initialValue: string
}

export default function PreferencesModal({ open, setOpen, initialValue }: PreferencesModalProps) {
  const [value, setValue] = useState(initialValue)
  const [edit, setEdit] = useState(false)
  const workspaceId = useWorkspaceId()
  const router = useRouter()

  const { mutate: updatedWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace()
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace()
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this workspace?",
    "This action cannot be undone. All data associated with this workspace will be permanently deleted."
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updatedWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          setEdit(false)
          toast.success("Workspace updated successfully")
        },
        onError: () => {
          toast.error("Failed to update workspace")
        },
      }
    )
  }

  const handleRemove = async () => {
    const ok = await confirm()
    if (!ok) return null

    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          router.replace("/")
          toast.success("Workspace deleted successfully")
        },
        onError: () => {
          toast.error("Failed to delete workspace")
        },
      }
    )
  }

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Workspace Preferences</DialogTitle>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workspace Details</CardTitle>
                <CardDescription>Manage your workspace information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="workspace-name">Workspace Name</Label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-700" id="workspace-name">{value}</p>
                    <Dialog open={edit} onOpenChange={setEdit}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Rename Workspace</DialogTitle>
                        </DialogHeader>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                          <div className="space-y-2">
                            <Label htmlFor="new-workspace-name">New Workspace Name</Label>
                            <Input
                              id="new-workspace-name"
                              value={value}
                              disabled={isUpdatingWorkspace}
                              onChange={(e) => setValue(e.target.value)}
                              required
                              autoFocus
                              minLength={3}
                              maxLength={60}
                              placeholder="Enter the new workspace name"
                            />
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" disabled={isUpdatingWorkspace}>
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isUpdatingWorkspace}>
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Separator />
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Danger Zone
                </CardTitle>
                {/* <CardDescription>
                  Actions in this section can lead to permanent data loss. Please proceed with caution.
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Deleting your workspace will result in the permanent loss of all associated data.
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    disabled={isRemovingWorkspace}
                    onClick={handleRemove}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Workspace
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}