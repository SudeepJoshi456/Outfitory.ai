import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(`${process.env.NEXT_PUBLIC_GEMINI_AI_API_KEY}`);
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

export async function getAIRecommendation(outfits: string[], weather: string) {
//   const model = new GenerativeModel(API_KEY, {model:"gemini-1.5-flash"}); 
    
  const prompt = `
    You are a skilled AI stylist. Given the following clothing options:

    All available outfits:
    - ${outfits.join(', ')}


    And the current weather conditions:

    Weather:
    - ${weather}
    The user is located in a city with the current weather conditions. never ask user for weather becuase you already have outfit and weather information. Analyze their wardrobe to suggest an outfit that matches the weather and their color palette preferences. If the wardrobe has fewer than 5 matching top-bottom combinations, let the user know. If there are no suitable outfits for the weather, inform the user as well. Also, suggest user to buy specific clothes that would be perfect for current weather. Keep the response concise.

  `;
    console.log(`${weather}`)
  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // Assuming the first element in text contains the response
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Could not fetch response from Gemini.");
  }
}