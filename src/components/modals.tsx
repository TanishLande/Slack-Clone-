"use client"
import { CreateChannelModal } from '@/app/features/channels/components/create-channel-modal';
import { CreateWorkspaceModal } from '@/app/features/workspace/components/create-workspace-modal'
import { useEffect, useState } from 'react'



const Modals = () => {
  const [mounted,setMounted] = useState(false);

  useEffect(() =>{
    setMounted(true);
  },[]);

  if(!mounted){
    return null
  }

  return (
    <div>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </div>
  )
}

export default Modals
