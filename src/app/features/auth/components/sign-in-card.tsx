import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFLow } from '../type'
import { useAuthActions } from "@convex-dev/auth/react";

interface SignInCardProps {
    setState: (state: SignInFLow) => void
};

const SignInCard = ({setState}: SignInCardProps) => {
    const { signIn } = useAuthActions();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSignIn = (value: "github" | "google") => {
        signIn(value);
    }

  return (
    <Card className='w-full h-full p-8'>
        <CardHeader>
            <CardTitle>
            Login to continue
            </CardTitle>  
            <CardDescription>
                Use your email or another service to login
            </CardDescription>        
        </CardHeader>
        
        <CardContent className='space-y-5 px-0 pb-0'>
            <form className='space-y-2.5'>
                <Input
                disabled = {false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                type='email'
                required
                />
                <Input
                disabled = {false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                type='password'
                required
                />
                <Button type='submit' className='w-full' size='lg' disabled={false}>
                    Continue with Email
                </Button>
            </form>
            <Separator />
            <div className="flex flex-col md:gap-y-2.5 text-sm text-center">
                <Button 
                variant="outline" 
                className='w-full'
                disabled={false}
                onClick={() => {}}
                size='lg'
                >
                   <FcGoogle className='size-5 mr-1  md:mr-2' /> Continue with Google 
                </Button>
                <Button 
                variant="outline" 
                className='w-full'
                disabled={false}
                onClick={() => handleSignIn("github")}
                size='lg'
                >
                   <FaGithub className='size-5 mr-1 md:mr-2' /> Continue with Github 
                </Button>
            </div>
            <p className='text-sm text-center text-muted-foreground'>
                Don&apos;t have an account? <span onClick={() => setState("signUp")} className='text-sky-700 hover:underline cursor-pointer'>Sign Up</span>
            </p>
        </CardContent>
    </Card>
  )
}

export default SignInCard
