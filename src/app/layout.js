// Dummy import to ensure db is connected
import { db } from "@/services/db";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FeedbackButton from "./components/FeedbackButton";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crowd fund tracker",
  description: "Crowd fund tracker",
};

export default async function RootLayout({ children }) {

  await db.on('open', () => {
    console.log('Connected to MongoDB');
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FeedbackButton />
        <Toaster />
      </body>
    </html>
  );
}
