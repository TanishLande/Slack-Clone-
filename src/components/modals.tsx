"use client"
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
    </div>
  )
}

export default Modals
