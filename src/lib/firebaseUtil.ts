import { db } from './firebase'; // Adjust the path if necessary
import { collection, getDocs } from 'firebase/firestore';
import { Outfit } from './types'; // Adjust the path as needed

// Function to fetch all outfits from Firestore
export const fetchAllOutfits = async (userId: string): Promise<Outfit[]> => {
  const closetRef = collection(db, `users/${userId}/closet`);
  const snapshot = await getDocs(closetRef);
  
  const outfitsList: Outfit[] = []; // Array to hold all outfits

  snapshot.docs.forEach((doc) => {
    const outfit = { id: doc.id, ...doc.data() } as Outfit;
    outfitsList.push(outfit); // Add outfit to the list
  });

  return outfitsList; // Return the array of all outfits
};