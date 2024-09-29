"use client"

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Ensure this path is correct
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'; // Adjust if necessary
import { Outfit } from '@/lib/types'; // Adjust the path as needed
import '@/styles/closet.styles.css'; // Import the CSS file

export default function Closet() {
  const [user] = useAuthState(auth); // Get user authentication state
  const [tops, setTops] = useState<Outfit[]>([]); // Define tops state
  const [bottoms, setBottoms] = useState<Outfit[]>([]); // Define bottoms state
  const [newOutfit, setNewOutfit] = useState({ color: '', category: 'top', name: '' }); // Define new outfit state
  const [showAddForm, setShowAddForm] = useState(false); // Toggle for showing add form

  // Fetch closet items
  const fetchCloset = async () => {
    if (user) {
      const closetRef = collection(db, `users/${user.uid}/closet`);
      const snapshot = await getDocs(closetRef);

      const topsList: Outfit[] = [];
      const bottomsList: Outfit[] = [];

      snapshot.docs.forEach((doc) => {
        const outfit = { id: doc.id, ...doc.data() } as Outfit;
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

  useEffect(() => {
    if (user) {
      fetchCloset();
    }
  }, [user]);

  const removeOutfit = async (id: string) => {
    if (user) {
      const outfitRef = doc(db, `users/${user?.uid}/closet/${id}`);
      await deleteDoc(outfitRef);
      fetchCloset();
    }
  };

  const addOutfit = async () => {
    if (user && newOutfit.color.trim() && newOutfit.name.trim()) {
      await addDoc(collection(db, `users/${user.uid}/closet`), {
        color: newOutfit.color,
        name: newOutfit.name,
        category: newOutfit.category,
      });
      setNewOutfit({ color: '', category: 'top', name: '' });
      setShowAddForm(false);
      fetchCloset();
    } else {
      alert("Please fill in all fields.");
    }
  };
  

  return (
    <div className="container">
      <h1>YOUR CLOSET</h1>
      <button className="add-outfit-button" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add Outfit'}
      </button>

      {showAddForm && (
        <div className="add-outfit-form">
          <input
            type="text"
            placeholder="Color"
            value={newOutfit.color}
            onChange={e => setNewOutfit(prev => ({ ...prev, color: e.target.value }))}
            className="input"
          />
          <input
            type="text"
            placeholder="Name"
            value={newOutfit.name}
            onChange={e => setNewOutfit(prev => ({ ...prev, name: e.target.value }))}
            className="input"
          />
          <select
            value={newOutfit.category}
            onChange={e => setNewOutfit(prev => ({ ...prev, category: e.target.value }))}
            className="select"
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>
          <button className="add-outfit-button" onClick={addOutfit}>
            Add Outfit
          </button>
        </div>
      )}

      <div className="closet-lists">
        <div className="list">
          <h2>Tops</h2>
          {tops.map(top => (
            <div key={top.id} className="list-item">
              <span>{top.color} - {top.name}</span>
              <button className="remove-button" onClick={() => removeOutfit(top.id)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="vertical-divider"></div>

        <div className="list">
          <h2>Bottoms</h2>
          {bottoms.map(bottom => (
            <div key={bottom.id} className="list-item">
              <span>{bottom.color} - {bottom.name}</span>
              <button className="remove-button" onClick={() => removeOutfit(bottom.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
