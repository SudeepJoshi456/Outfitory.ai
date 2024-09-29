"use client";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import Link from 'next/link';
import "@/styles/home.styles.css"
import { motion } from "framer-motion";

export default function Home() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [weather, setWeather] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const email = user.email || "Guest";
        const regex = /^([^@]+)/;
        const match = email.match(regex);
        if(match){
        setUsername(match[1]);
        } else {
          setUsername("Guest");
        }
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
      setWeather(res.data.weather[0].description);
    };

    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocationAndFetchWeather();
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <motion.h1 initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.25, delay:0.25}}  className="text-6xl font-serif racing-sans-one-regular">Welcome, {username || 'Guest'}!</motion.h1>
      <div className="w-2/3 mt-8 flex flex-col items-center justify-center">
        <motion.div className="w-1/2 m-4 flex justify-center racing-sans-one-regular" initial={{x:100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.25, delay:0.5}}>
        <Link href="/closet" className="w-full p-8 bg-slate-800 text-white rounded block text-2xl text-center">
            Your Closet
        </Link>
        
        </motion.div>
        <motion.div className="w-1/2 m-4 flex justify-center racing-sans-one-regular" initial={{x:100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.25, delay:0.5}}>
        <Link href="/AiResponse" className="w-full p-8 bg-pink-700 text-white rounded block text-2xl text-center">
            Get AI Recommendation
        </Link>
        
        </motion.div>
        

        
      </div>
    </div>
  );
}
