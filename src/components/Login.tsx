// src/app/login/page.tsx
"use client"
"use state"
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (isSignUp) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-8">{isSignUp ? 'Sign Up' : 'Login'}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 mb-4"
      />
      <button onClick={handleAuth} className="px-4 py-2 bg-blue-500 text-white mb-4">
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500">
        {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
      </button>
    </div>
  );
}
