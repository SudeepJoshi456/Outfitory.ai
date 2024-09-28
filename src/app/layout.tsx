// src/app/layout.tsx
"use client"

import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
