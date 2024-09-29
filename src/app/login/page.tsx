// src/app/login.tsx
"use client";

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
// import { FaGoogle, FaFacebook, FaApple, FaGithub } from 'react-icons/fa'; // Make sure to install react-icons

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  // const handleSocialSignIn = (provider: string) => {
  //   // Handle social sign-in logic based on the provider
  //   alert(`Sign in with ${provider} is not implemented yet.`);
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-6">{isSignup ? 'Sign Up' : 'Login'}</h1>
      <input
        type="email"
        placeholder="Email"
        className="mb-4 px-4 py-2 border rounded bg-gray-800 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 px-4 py-2 border rounded bg-gray-800 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="mb-4 px-4 py-2 bg-blue-600 rounded">
        {isSignup ? 'Sign Up' : 'Login'}
      </button>
      <p className="text-sm mb-4">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <span
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-400 cursor-pointer ml-2"
        >
          {isSignup ? 'Login here' : 'Sign up here'}
        </span>
      </p>
      
    </div>
  );
}
