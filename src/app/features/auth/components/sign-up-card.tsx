import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFLow } from '../type'
import { TriangleAlert, Eye, EyeOff } from "lucide-react";
import { useAuthActions } from '@convex-dev/auth/react'

interface SignUpCardProps {
    setState: (state: SignInFLow) => void
};

const SignUpCard = ({setState}: SignUpCardProps) => {
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pending, setPending] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [name,setName] = useState("")

    const onPasswordSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match")
            return;
        }

        try{
            setPending(true);
            await signIn("password", {
                name,
                email,
                password,
                flow: "signUp"
            })
        } catch(error) {
            console.log(error);
            setError("Something went wrong")
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
                    Signup to continue
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
                <form onSubmit={onPasswordSignUp} className='space-y-2.5'>
                    <Input 
                    disabled={pending}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder='Name'
                    required
                    />
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
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={pending}
                        >
                            {showPassword ? <EyeOff className="text-muted-foreground h-4 w-4" /> : <Eye className="text-muted-foreground h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="relative">
                        <Input
                            disabled={pending}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm Password'
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={pending}
                        >
                            {showConfirmPassword ? <EyeOff className="text-muted-foreground h-4 w-4" /> : <Eye className="text-muted-foreground h-4 w-4" />}
                        </Button>
                    </div>
                    <Button type='submit' className='w-full' size='lg' disabled={pending}>
                        Continue with Email
                    </Button>
                </form>
                {/* <p className='text-sm text-muted-foreground'>

                </p> */}
                <Separator />
                <div className="flex flex-col gap-y-2.5 text-sm text-center">
                    <Button 
                        variant="outline" 
                        className='w-full'
                        disabled={pending}
                        onClick={() => handleSignIn("google")}
                        size='lg'
                    >
                       <FcGoogle className='size-5 mr-2' /> Continue with Google 
                    </Button>
                    <Button 
                        variant="outline" 
                        className='w-full'
                        disabled={pending}
                        onClick={() => handleSignIn("github")}
                        size='lg'
                    >
                       <FaGithub className='size-5 mr-2' /> Continue with Github 
                    </Button>
                </div>
                <p className='text-sm text-center text-muted-foreground'>
                    Already have an account? <span onClick={() => setState("signIn")} className='text-sky-700 hover:underline cursor-pointer'>Sign In</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignUpCard