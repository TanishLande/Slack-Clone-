"use client"


import { useEffect, useMemo } from "react";
import UserButton from "./features/auth/components/user-Button";
import { useGetWorkspaces } from "./features/workspace/api/use-get-workspaces";
import { useCreateWorkSpaceModal } from "./features/workspace/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkSpaceModal();

  const workSpacesId =  useMemo(() => {
    return data?.[0]?._id
  }, [data])

  useEffect(() => {
    if(isLoading) return;

    if(workSpacesId) {
      router.replace(`/workspace/${workSpacesId}`);
    } else if (!open) {
      setOpen(true)
    }
  }, [workSpacesId, isLoading, open, setOpen])

  return (
    <div className="flex">
      <UserButton />
    </div>
  );
}
