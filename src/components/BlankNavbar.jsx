import React from "react";
import pixelBg from "../assets/Group 85.png";

export default function Navbar() {
  return (
    <header className="relative h-[114px] shadow-md flex items-center justify-center">
      <img
        src={pixelBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </header>
  );
}
