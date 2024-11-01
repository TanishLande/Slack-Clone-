"use client"
import { useGetWorkspace } from "@/app/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id"

const workspaceId = () => {
  const workspaceId =  useWorkspaceId();
  const { data } = useGetWorkspace( {id: workspaceId } );

  return (
    <div>
      ID:  {data?.userId} <br />
      name: {data?.name} <br />
      joinCode: {data?.joinCode}
    </div>
  )
}

export default workspaceId
