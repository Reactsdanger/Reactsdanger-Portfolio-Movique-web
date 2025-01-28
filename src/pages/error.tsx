import React from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Error: React.FC = () => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex items-center justify-center min-h-screen bg-gray-900 text-white`}
    >
      <div className="text-center max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Oops!</h1>
        <p className="text-lg mb-6">
          Something went wrong. We couldn't find the page you're looking for or
          an unexpected error occurred.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
              Go to Home
          </Link>
          <Link href="/contact">
              Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
