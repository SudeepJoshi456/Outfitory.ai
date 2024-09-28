// src/components/Navbar.tsx
"use client"

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="flex justify-between p-4 bg-blue-500 text-white">
      <div>
      <Link href="/" className="text-lg font-bold">
    Closet App
    </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <img src={user.photoURL || '/default-profile.png'} alt="Profile" className="w-8 h-8 rounded-full" />
            <span>{user.displayName}</span>
            <button onClick={() => auth.signOut()} className="px-4 py-2 bg-red-500 rounded">
              Logout
            </button>
          </div>
        ) : (
            <Link href="/login" className="px-4 py-2 bg-green-500 rounded">
            Login/Signup
        </Link>
        
        )}
      </div>
    </nav>
  );
}
