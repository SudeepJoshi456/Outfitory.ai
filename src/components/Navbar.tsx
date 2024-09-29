// src/components/Navbar.tsx
"use client"

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import "@/styles/home.styles.css";
import {motion} from "framer-motion";


export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="flex justify-between p-4 bg-transparent text-white">
      <div>
      <Link href="/" className="text-lg font-bold racing-sans-one-regular">
    <motion.button initial={{y:-100, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.25, delay:0.5}} >Closet App</motion.button>
    </Link>
      </div>
      <motion.div initial={{y:-100, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.3, delay:0.5}}>
        {user ? (
          <div className="flex items-center space-x-4">
            <img src={user.photoURL || '/default-profile.png'} alt="Profile" className="w-8 h-8 rounded-full" />
            <span>{user.displayName}</span>
            <button onClick={() => auth.signOut()} className="px-4 py-2 bg-red-500 rounded">
              Logout
            </button>
          </div>
        ) : (
            <Link href="/login" className="px-4 py-2 bg-green-300 rounded racing-sans-one-regular">
            Login/Signup
        </Link>
        
        )}
      </motion.div>
    </nav>
  );
}
