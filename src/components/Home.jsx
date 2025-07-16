"use client";

import Card1 from "../assets/Group 37394.png";
import Card2 from "../assets/Group 37395.png";
import Card3 from "../assets/Group 37396.png";
import Card4 from "../assets/Group 37400.png";
import Card5 from "../assets/Group 37399.png";
import Card6 from "../assets/Group 37398.png";
import { useNavigate } from "react-router-dom";



export default function HomePage() {

    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {[Card2, Card2, Card3, Card4, Card5, Card6].map((card, i) => (
                        <div
                            key={i}
                            className="h-96 p-4 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${card})`,
                            }}
                        />
                    ))}
                </div>
            </main>

            {/* Fixed Bottom Bar */}

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-end">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-right">

                        <div>
                            <p className="text-sm sm:text-base">
                                Total: <span className="font-bold text-lg sm:text-xl">EUR 0</span> <span className="ml-2">Incl. 19% VAT</span>
                            </p>
                            <p className="text-xs text-white/80">View Ticket summary</p>
                        </div>

                        <button className="bg-white text-green-800 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition" onClick={() => { navigate('/register') }}>
                            Buy Now
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}
