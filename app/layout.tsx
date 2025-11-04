'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

// Load the Mochiy Pop P One font
const mochiyPopPOne = 
Poppins({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-mochiy",
  display: 'swap',
});





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={`${mochiyPopPOne.variable} antialiased bg-[#F9FAFB] `}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}