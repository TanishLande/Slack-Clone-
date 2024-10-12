"use client";

import React, { useState } from 'react';
import { SignInFLow } from '../type';
import SignUpCard from './sign-up-card';
import SignInCard from './sign-in-card';
import { motion } from 'framer-motion';

const AuthScreen = () => {
  const [state, setState] = useState<SignInFLow>("signIn");
  
  const toggleState = () => {
    setState(state === "signIn" ? "signUp" : "signIn");
  };
  
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-t from-white via-purple-300 to-purple-700">
      {/* Container for larger screens */}
      <div className="hidden sm:flex w-full max-w-4xl h-[600px] rounded-xl shadow-2xl overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/purpleBg.png')",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        
        <motion.div
          className="w-1/2 h-full flex flex-col items-center justify-end p-8 relative z-10"
          initial={{ x: state === "signIn" ? 0 : "100%" }}
          animate={{ x: state === "signIn" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button
            onClick={toggleState}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors shadow-md"
          >
            {state === "signIn" ? "Sign Up" : "Sign In"}
          </button>
        </motion.div>
        
        <motion.div
          className="w-1/2 h-full bg-white bg-opacity-90 backdrop-blur-sm relative z-10"
          initial={{ x: state === "signIn" ? 0 : "-100%" }}
          animate={{ x: state === "signIn" ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {state === "signIn" ? (
            <SignInCard setState={setState} />
          ) : (
            <SignUpCard setState={setState} />
          )}
        </motion.div>
      </div>

      {/* Container for small screens */}
      <div className="sm:hidden w-full max-w-md px-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          {state === "signIn" ? (
            <SignInCard setState={setState} />
          ) : (
            <SignUpCard setState={setState} />
          )}
          {/* <button
            onClick={toggleState}
            className="w-full mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors shadow-md"
          >
            {state === "signIn" ? "Sign Up Instead" : "Sign In Instead"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;