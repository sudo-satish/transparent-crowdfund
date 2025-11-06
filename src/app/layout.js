import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import FeedbackButton from "./components/FeedbackButton";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "./components/LoadingProvider";
import Navbar from "./components/Navbar";
import { db } from "@/services/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RaiseIt - Fund Your Dreams",
  description:
    "A platform for creators to fund their dreams through community support.",
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <LoadingProvider>
            <Navbar />
            {children}
            <FeedbackButton />
            <Toaster />
          </LoadingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
