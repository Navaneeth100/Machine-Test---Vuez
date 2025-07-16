"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/image 4.png";

export default function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white shadow-xl rounded-lg p-10 sm:p-12 text-center max-w-2xl w-full relative">
        {/* Top green bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-green-600 rounded-t-lg" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-4">THANK YOU!</h1>

        <p className="text-lg text-gray-700 font-medium mb-2">
          Your Registration Has Been Submitted Successfully
        </p>

        <p className="text-base text-gray-700 font-medium mb-8 leading-relaxed">
          A Confirmation Email With Your Event Details Will Be Sent To You Shortly. <br />
          Please Check Your Inbox (And Spam Folder).
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:from-green-600 hover:to-green-700 transition-all"
        >
          Return To Homepage
        </button>
      </div>
    </div>
  );
}
