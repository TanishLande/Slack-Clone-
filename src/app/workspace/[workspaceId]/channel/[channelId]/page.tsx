"use client"
import { UserGetChannels } from '@/app/features/channels/api/use-get-channel';
import { useCreateChannelModal } from '@/app/features/channels/store/use-create-channel-modal';
import { useCurrentMember } from '@/app/features/member/api/use-current-member';
import { useGetMember } from '@/app/features/member/api/use-get-members';
import { useGetWorkspace } from '@/app/features/workspace/api/use-get-workspace';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import { Loader, Triangle } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'



const ChannelIdPage = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [open,setOpen] = useCreateChannelModal();

    const { data: member , isLoading: memberLoading } = useCurrentMember({ workspaceId })
    const  {data: workspace, isLoading: workspaceLoading } = useGetWorkspace( { id: workspaceId })
    const { data: channels, isLoading: channelIsLoading } = UserGetChannels({ workspaceId });

    const channelId = useMemo(() => channels?.[0]._id,[channels])
    const isAdmin = useMemo(() => member?.role === "admin", [member?.role])

    useEffect(() => {
        if( workspaceLoading || channelIsLoading || workspace || !member || !memberLoading ) return;

        if(channels){
            router.push(`/workspace/${workspaceId}/channel/${channelId}`);
        } else if (!open) {
            setOpen(true);
        } else if (!open && isAdmin){
            setOpen(false);
        }
    }, [
        member,
        memberLoading,
        isAdmin,
        channelId,
        workspaceLoading,
        channelIsLoading,
        workspace,
        open,
        setOpen,
        workspaceId
    ])

    if(workspaceLoading || channelIsLoading){
        return(
            <div className='h-full flex-1 flex item-center justify-center'>
                <Loader className='size-6 text-muted-foreground' />
            </div>
        )
    }

    if(!workspaceId) {
        return(
            <div className='h-full flex-1 flex item-center justify-center'>
                <Triangle className='size-6  text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>
                    Channel not found
                </span>
            </div>
            
        )
    }

  return (
    null
  )
}

export default ChannelIdPage
