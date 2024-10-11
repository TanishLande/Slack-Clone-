"use client";

import React, { useState } from 'react'
import { SignInFLow } from '../type';
import SignUpCard from './sign-up-card';
import SignInCard from './sign-in-card';

const AuthScreen = () => {
    const [state,setState] = useState<SignInFLow >("signIn")
  return (
    <div className='h-full flex items-center justify-center bg-[#5C5B58]'>
        <div className='md:h-auto md:w-[420px]'>
            {
                state === "signIn" ?
                <SignInCard  setState={setState}/> :
                <SignUpCard  setState={setState} />
            }
        </div>
      
    </div>
  )
}

export default AuthScreen
