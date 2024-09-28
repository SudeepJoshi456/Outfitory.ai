"use client";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import Link from 'next/link';

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
      <h1 className="text-3xl">Welcome, {username || 'Guest'}!</h1>
      <div className="mt-8 space-y-4">
        <Link href="/closet" className="px-4 py-2 bg-blue-500 text-white rounded">
          Your Closet
        </Link>

        <button
          onClick={() => {
            alert(`The weather is ${weather}. Consider wearing white t-shirt and blue shorts.`);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Get AI Recommendation
        </button>
        <Link href="/select-outfit" className="px-4 py-2 bg-yellow-500 text-white rounded">Select Outfit for the Day
        </Link>
      </div>
    </div>
  );
}
