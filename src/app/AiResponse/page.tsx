"use client"

import { useState, useEffect } from 'react';
import { fetchAllOutfits } from '../../lib/firebaseUtil';
import { getAIRecommendation } from '../../lib/aiUtils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'; // Adjust if necessary
import { Outfit } from '@/lib/types'; // Adjust the path as needed
import axios from "axios";
const OutfitRecommendation = () => {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth); // Get user authentication state
  const [weather, setWeather] = useState('');

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

  const handleGetRecommendation = async () => {
    setLoading(true);
    setRecommendation(null);

    try {
      // Fetch top and bottom wear from Firebase
      const outfitsList = await fetchAllOutfits(`${user?.uid}`);
      // Example weather data (in real use, fetch from weather API)
        const outfitsString:string[] = outfitsList.map((top) => `${top.color} ${top.name}`);
        // const bottomsString:string[] = bottoms.map((bottom) => `${bottom.color} ${bottom.name}`);

      // Get AI recommendation from OpenAI
      const aiResponse = await getAIRecommendation(outfitsString, weather);
      setRecommendation(aiResponse);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center bg-[url('../public/images/racing-jpg.jpg')] justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-white">
      <div className="w-full max-w-xl p-8 bg-black rounded-xl shadow-lg text-white">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          AI Outfit Recommendation
        </h1>
        
        <div className="text-center mb-6">
          <button
            onClick={handleGetRecommendation}
            disabled={loading}
            className={`px-6 py-2 text-white font-semibold rounded-lg ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring focus:ring-indigo-300`}
          >
            {loading ? 'Loading...' : 'TODAY\'S OUTFIT'}
          </button>
        </div>

        {recommendation && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Recommended Outfit:</h3>
            <p className="text-gray-800 mt-2">{recommendation}</p>
          </div>
        )}

        {!recommendation && !loading && (
          <p className="text-center text-gray-500">Click the button to get your AI-based outfit recommendation based on today’s weather.</p>
        )}
      </div>
    </div>
  );
};

export default OutfitRecommendation;
