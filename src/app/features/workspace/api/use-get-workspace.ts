import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel";


interface UseGetWorkspaceProps {
    id: Id<"workspaces">;
}

export const useGetWorkspace = ({
    id
}: UseGetWorkspaceProps) =>{
    const data =  useQuery(api.workspace.getUserId, {id});
    const isLoading = data === undefined;

    return {
        data,
        isLoading
    }
}