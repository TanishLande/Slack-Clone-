"use client"

import { useGetWorkspace } from '@/app/features/workspace/api/use-get-workspace'
import { useGetWorkspaceInfo } from '@/app/features/workspace/api/use-get-workspace-info'
import { useGetWorkspaces } from '@/app/features/workspace/api/use-get-workspaces'
import { UseJoin } from '@/app/features/workspace/api/use-join'
import { useNewJoinCode } from '@/app/features/workspace/api/use-new-joincode'
import { useWorkspaceId } from '@/app/hooks/use-workspace-id'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import VerificationInput from "react-verification-input"
import { toast } from 'sonner'

const JoinPage = () => {
    const workspaceId = useWorkspaceId();
    const router =  useRouter();

    const {data , isLoading} = useGetWorkspaceInfo({ id: workspaceId });
    const { mutate, isPending  } = UseJoin();

    const isMember = useMemo(() => data?.isMember, [data?.isMember]);

    useEffect(() => {
        if(isMember){
            router.push(`/workspace/${workspaceId}`)
        }
    }, [isMember, router, workspaceId])

    const handleComplete = (value: string) => {
        mutate({ workspaceId, joinCode: value },{
            onSuccess: (id) => {
                router.replace(`/workspace/${id}`)
                toast.success("Workspace Joined")
            },
            onError: () => {
                toast.error("Failed  to join Workspace ")
            }
        })
    }

    if(isLoading){
        return(
            <div className='h-full flex items-center justify-center'>
                <Loader className='size-6 animate-spin text-muted-foreground' />
            </div>
        )
    }

  return (
    <div className='h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md'>
      <Image
        src="/images/purpleBg.png"
        alt="Logo"
        width={60}
        height={60}
      />
      <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
        <div className='flex flex-col gap-y-4 item-center items-center justify-center'>
            <h1>
                Join {data?.name}
            </h1>
            <p className='text-md text-muted-foreground'>
                Enter the workspace code to join 
            </p>
        </div>
        <VerificationInput 
            onComplete={handleComplete}
            length={6}
            classNames={{
                container: cn("flex gap-x-2", isPending && "opacity-50 cursor-not-allowed" ),
                character: "uppercase h-auto rounded-md border border-gray-300 flex item-center justify-center font-medium text-gray-500",
                characterInactive: "bg-muted",
                characterSelected: "bg-white text-black",
                characterFilled: "bg-white text-black"
            }}
            autoFocus
        />
        <div className='flex gap-x-4'>
            <Button
                size="lg"
                variant="outline"
                asChild
            >
                <Link href="/">
                    Back to Home
                </Link>
            </Button>
        </div>
      </div>
    </div>
  )
}

export default JoinPage
