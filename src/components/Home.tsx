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
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUsername(userDoc.exists() ? userDoc.data()?.name : user.displayName);
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
      <motion.h1 initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:1, delay:1.5}}  className="text-6xl font-serif racing-sans-one-regular">Welcome, {username || 'Guest'}!</motion.h1>
      <div className="w-2/3 mt-8 flex flex-col items-center justify-center">
        <div className="w-1/2 m-4 flex justify-center racing-sans-one-regular">
        <button
            onClick={() => {
              alert(`In progress`);
            }}
            className="w-full p-8 bg-slate-500 text-white rounded block text-2xl "
          >
            Your Closet
          </button>
        </div>
        <div className='w-1/2 m-4 flex justify-center racing-sans-one-regular'>
          <button
            onClick={() => {
              alert(`The weather is ${weather}. Consider wearing white t-shirt and blue shorts.`);
            }}
            className="w-full p-8 bg-green-500 text-white rounded text-2xl"
          >
            Get AI Recommendation
          </button>
        </div>
        

        
      </div>
    </div>
  );
}
