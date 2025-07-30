"use client"

import { Route, Routes, useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import RegistrationForm from "./components/RegistrationForm"
import TicketSelection from "./components/TicketSelection"
import HomePage from "./components/Home"
import ThankYouPage from "./components/Thankyou"
import BlankNavbar from "./components/BlankNavbar"


export default function Page() {

  const location = useLocation()

  const isThankYouPage = location.pathname === "/thank-you"

  return (
    <div>
      {isThankYouPage ? <BlankNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<TicketSelection />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
      {isThankYouPage ? <BlankNavbar /> : <Footer />}
    </div>
  )
}
