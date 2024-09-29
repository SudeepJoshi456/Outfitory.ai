"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Make sure this path is correct
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'; // Adjust if necessary
import { Outfit } from '@/lib/types'; // Adjust the path as needed

export default function Closet() {
  const [user] = useAuthState(auth); // Get user authentication state
  const [tops, setTops] = useState<Outfit[]>([]); // Define tops state
  const [bottoms, setBottoms] = useState<Outfit[]>([]); // Define bottoms state
  const [newOutfit, setNewOutfit] = useState({ color: '', category: 'top', name: '' }); // Define new outfit state
  const [showAddForm, setShowAddForm] = useState(false); // Toggle for showing add form

  // Fetch closet items
  const fetchCloset = async () => {
    if (user) {
      const closetRef = collection(db, `users/${user.uid}/closet`); // Use the closet collection directly
      const snapshot = await getDocs(closetRef);

      const topsList: Outfit[] = [];
      const bottomsList: Outfit[] = [];

      snapshot.docs.forEach((doc) => {
        const outfit = { id: doc.id, ...doc.data() } as Outfit; // Fixed here
        if (outfit.category === 'top') {
          topsList.push(outfit);
        } else if (outfit.category === 'bottom') {
          bottomsList.push(outfit);
        }
      });

      setTops(topsList);
      setBottoms(bottomsList);
    }
  };

  // useEffect to fetch closet items when the user changes
  useEffect(() => {
    if (user) {
      fetchCloset();
    }
  }, [user]);

  // Function to remove an outfit
  const removeOutfit = async (id: string) => {
    if (user) {
      const outfitRef = doc(db, `users/${user?.uid}/closet/${id}`);
      await deleteDoc(outfitRef);
      fetchCloset(); // Refresh closet items after removal
    }
  };

  // Function to add a new outfit
  const addOutfit = async () => {
    // Check if user is defined and all fields are filled
    if (user && newOutfit.color.trim() && newOutfit.name.trim()) {
      await addDoc(collection(db, `users/${user.uid}/closet`), {
        color: newOutfit.color,
        name: newOutfit.name,
        category: newOutfit.category,
      });
      setNewOutfit({ color: '', category: 'top', name: '' }); // Reset the form
      setShowAddForm(false); // Hide form after submission
      fetchCloset(); // Refresh closet items after adding
    } else {
      alert("Please fill in all fields."); // Validation alert
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Closet</h1>

      {/* Button to toggle the add outfit form */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white"
      >
        {showAddForm ? 'Cancel' : 'Add Outfit'}
      </button>

      {/* Add outfit form */}
      {showAddForm && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Color"
            value={newOutfit.color}
            onChange={e => setNewOutfit({ ...newOutfit, color: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Name"
            value={newOutfit.name}
            onChange={e => setNewOutfit({ ...newOutfit, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <select
            value={newOutfit.category}
            onChange={e => setNewOutfit({ ...newOutfit, category: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>
          <button onClick={addOutfit} className="px-4 py-2 bg-blue-500 text-white">
            Add Outfit
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Tops</h2>
      <div className="mb-4">
        {tops.map(top => (
          <div key={top.id} className="flex justify-between border-b py-2">
            <span>{top.color} - {top.name}</span>
            <button onClick={() => removeOutfit(top.id)} className="text-red-500">Remove</button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Bottoms</h2>
      <div>
        {bottoms.map(bottom => (
          <div key={bottom.id} className="flex justify-between border-b py-2">
            <span>{bottom.color} - {bottom.name}</span>
            <button onClick={() => removeOutfit(bottom.id)} className="text-red-500">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
