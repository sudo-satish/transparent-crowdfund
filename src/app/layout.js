import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import FeedbackButton from "./components/FeedbackButton";
import { Toaster } from "react-hot-toast";
import { db } from "@/services/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CrowdFund - Fund Your Dreams",
  description: "A platform for creators to fund their dreams through community support.",
};

export default async function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <FeedbackButton />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
