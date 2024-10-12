import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFLow } from '../type'
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert, Eye, EyeOff } from "lucide-react";

interface SignInCardProps {
    setState: (state: SignInFLow) => void
};

const SignInCard = ({setState}: SignInCardProps) => {
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const onPasswordSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setPending(true);
            await signIn("password", {
                email,
                password,
                flow: "signIn"
            })
        } catch(error) {
            console.log(error);
            setError("Email or password is incorrect")
        } finally {
            setPending(false);
        }
    }

    const handleSignIn = async (value: "github" | "google") => {
        try {
            setPending(true);
            await signIn(value);
        } catch(error) {
            console.log(error);
            setError("Something went wrong")
        } finally {
            setPending(false);
        }
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
            {error && 
            <p className='bg-destructive/15 p-3 flex rounded-md items-center gap-x-2 text-sm text-destructive mb-6'>
               <TriangleAlert className='size-4' /> {error}
            </p>} 
            <CardContent className='space-y-5 px-0 pb-0'>
                <form onSubmit={onPasswordSignIn} className='space-y-2.5'>
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        type='email'
                        required
                    />
                    <div className="relative">
                        <Input
                            disabled={pending}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={pending}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                    <Button type='submit' className='w-full' size='lg' disabled={pending}>
                        Continue with Email
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col md:gap-y-2.5 text-sm text-center">
                    <Button 
                        variant="outline" 
                        className='w-full text-muted-foreground'
                        disabled={pending}
                        onClick={() => handleSignIn("google")}
                        size='lg'
                    >
                       <FcGoogle className='size-5 mr-1 md:mr-2' /> Continue with Google 
                    </Button>
                    <Button 
                        variant="outline" 
                        className='w-full text-muted-foreground'
                        disabled={pending}
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