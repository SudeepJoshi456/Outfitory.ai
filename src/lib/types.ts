// src/types.ts

export interface Outfit {
    id: string;      // Unique identifier for the outfit
    color: string;   // Color of the outfit
    name: string;    // Name of the outfit
    category: 'top' | 'bottom'; // Category of the outfit (top or bottom)
  }
  