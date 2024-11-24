import { useCurrentMember } from '@/app/features/member/api/use-current-member';
import { useGetWorkspace } from '@/app/features/workspace/api/use-get-workspace';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id'
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from 'lucide-react';
import React from 'react'
import { WorkspaceHeader } from './WorspaceHeader';
import { SidebarItem } from './sidebar-item';
import { UserGetChannels } from '@/app/features/channels/api/use-get-channel';
import { WorkspaceSection } from './workspace-section';
import { useGetMember } from '@/app/features/member/api/use-get-members';
import { UserItem } from './user-item';
import { useCreateChannelModal } from '@/app/features/channels/store/use-create-channel-modal';
import { useChannelId } from '@/app/hooks/use-channel-id';

const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();
    const channelId = useChannelId();

    const { data: member, isLoading: memberLoading  } = useCurrentMember({ workspaceId });
    const { data: workspace , isLoading: workspaceLoading } = useGetWorkspace({ id:workspaceId });
    const { data: channels, isLoading: channelIsLoading } = UserGetChannels({ workspaceId });
    const { data: members, isLoading: membersIsloading } = useGetMember({ workspaceId });

    const [_open, setOpen] = useCreateChannelModal();

    if(
        workspaceLoading || memberLoading
    ) {
        return(
            <div className='flex flex-col bg-[#5E2C5F] h-full items-center justify-center'>
                <Loader className='size-5 animate-spin text-white' />
            </div>
        )
    }

    if( 
        !workspace || !member
    ) {
        return(
            <div className='flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center'>
                <AlertTriangle className='size-5  text-white' />
                <p className='text-white'>
                    Workspace not found
                </p>
            </div>
        )
    }

  return (
    <div className='felx flex-col bg-[#5E2C5F] h-full'>
        <WorkspaceHeader workspace={workspace} isAdmin={ member.role == "admin" } />
        <div className='flex flex-col px-2 mt-3'>
            <SidebarItem
                label="threads"
                icon={MessageSquareText}
                id="threads"
            />
            <SidebarItem
                label="Draft and sent"
                icon={SendHorizonal}
                id="draft"
            />
            </div>
            <WorkspaceSection
                label="Channels"
                hint="New Channel"
                onNew={member.role === "admin" ? () => setOpen(true): undefined}
            >
                {channels?.map((item) => (
                    <SidebarItem 
                        key={item._id}
                        icon={HashIcon}
                        label={item.name}
                        id={item._id}
                        variant={channelId == item._id ? "active" : "default"}   
                    />
                ))}
            </WorkspaceSection>
            <WorkspaceSection
                 label="Direct Messages"
                 hint="New direct Message"
                 onNew={() => {}}
            >
            {members?.map((item) => (
                <UserItem 
                    key={item._id}
                    id={item._id}
                    label={item.user.name}
                    image={item.user.image}
                />
            ))}
            </WorkspaceSection>
    </div>
  )
}

export default WorkspaceSidebar