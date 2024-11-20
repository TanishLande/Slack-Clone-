
import workspaceId from "@/app/workspace/[workspaceId]/page";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

interface UserGetChannelProps{
    workspaceId: Id<"workspaces">
};


export const UserGetChannels = ({
    workspaceId
}: UserGetChannelProps ) => {
    const data = useQuery(api.channels.get, { workspaceId });
    const isLoading = data == undefined;
    
    return { data, isLoading};
}