import React from "react";
import pixelBg from "../assets/Group 85 (1).png";

export default function Footer() {
  return (
    <header className="relative h-[170px] shadow-md">
      <img
        src={pixelBg}
        alt="Pixelated Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </header>
  );
}
