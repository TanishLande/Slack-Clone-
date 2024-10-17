interface workspaceIdProps {
    params:{
        workspaceId: string;
    }
}

const workspaceId = ({
    params
}: workspaceIdProps ) => {
  return (
    <div>
      ID:  {params.workspaceId}
    </div>
  )
}

export default workspaceId
