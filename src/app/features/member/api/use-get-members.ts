import { useQuery } from "convex/react"

import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel";

interface UseGetMemberProps {
    workspaceId: Id<"workspaces">;
}

export const useGetMember = ({
    workspaceId
}: UseGetMemberProps ) => {
    const data = useQuery(api.member.get, { workspaceId });
    const isLoading = data == undefined

    return {
        data ,
        isLoading
    } ;

}