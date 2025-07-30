"use client"

import { useState, useEffect } from "react"
import { ChevronRight, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ticketTypes = [
    {
        id: 1,
        name: "VISITOR 1 DAY ACCESS TICKET",
        price: 32.5,
        oldPrice: 45,
        isFree: false,
        color: "bg-purple-600",
        label: null,
        services: [
            { id: "s1", name: "Access to Connections & Investor Lounge", included: false },
            { id: "s2", name: "Network Events", included: false },
            { id: "s3", name: "All Conference Tracks", included: false },
            { id: "s4", name: "All Masterclasses", included: false },
            { id: "s5", name: "3 Days Access to the Show", included: true },
            { id: "s6", name: "Access to Dubai Internet City Lounge", included: false },
        ],
    },
    {
        id: 2,
        name: "VISITOR 2 DAY ACCESS TICKET",
        price: 20,
        oldPrice: 30,
        isFree: false,
        color: "bg-orange-500",
        label: null,
        services: [
            { id: "s1", name: "Access to Connections & Investor Lounge", included: true },
            { id: "s2", name: "Network Events", included: true },
            { id: "s3", name: "All Conference Tracks", included: true },
            { id: "s4", name: "All Masterclasses", included: true },
            { id: "s5", name: "3 Days Access to the Show", included: true },
            { id: "s6", name: "Access to Dubai Internet City Lounge", included: false },
        ],
    },
    {
        id: 3,
        name: "VISITOR 3 DAY ACCESS TICKET",
        price: 15,
        oldPrice: 18,
        isFree: false,
        color: "bg-green-500",
        label: "EXCLUSIVE",
        services: [
            { id: "s1", name: "Access to Connections & Investor Lounge", included: true },
            { id: "s2", name: "Network Events", included: true },
            { id: "s3", name: "All Conference Tracks", included: true },
            { id: "s4", name: "All Masterclasses", included: true },
            { id: "s5", name: "3 Days Access to the Show", included: true },
            { id: "s6", name: "Access to Dubai Internet City Lounge", included: false },
        ],
    },
    {
        id: 4,
        name: "VISITOR 4 DAY ACCESS TICKET",
        price: 28,
        oldPrice: 32,
        isFree: false,
        color: "bg-red-500",
        label: "BEST SELLER",
        services: [
            { id: "s1", name: "Access to Connections & Investor Lounge", included: true },
            { id: "s2", name: "Network Events", included: true },
            { id: "s3", name: "All Conference Tracks", included: true },
            { id: "s4", name: "All Masterclasses", included: true },
            { id: "s5", name: "3 Days Access to the Show", included: true },
            { id: "s6", name: "Access to Dubai Internet City Lounge", included: true },
        ],
    },
    {
        id: 5,
        name: "VISITOR 5 DAY ACCESS TICKET",
        price: 10,
        oldPrice: 14,
        isFree: false,
        color: "bg-green-600",
        label: null,
        services: [
            { id: "s1", name: "Access to Connections & Investor Lounge", included: true },
            { id: "s2", name: "Network Events", included: true },
            { id: "s3", name: "All Conference Tracks", included: true },
            { id: "s4", name: "All Masterclasses", included: true },
            { id: "s5", name: "3 Days Access to the Show", included: true },
            { id: "s6", name: "Access to Dubai Internet City Lounge", included: false },
        ],
    },
    {
        id: 6,
        name: "VISITOR 6 DAY ACCESS TICKET",
        price: 40,
        oldPrice: 43,
        isFree: false,
        color: "bg-blue-500",
        label: null,
        services: [
            { id: "s1", name: "Access to Connections & Investor Lounge", included: false },
            { id: "s2", name: "Network Events", included: false },
            { id: "s3", name: "All Conference Tracks", included: false },
            { id: "s4", name: "All Masterclasses", included: true },
            { id: "s5", name: "3 Days Access to the Show", included: true },
            { id: "s6", name: "Access to Dubai Internet City Lounge", included: false },
        ],
    },
];


export default function TicketSelection() {
    const navigate = useNavigate()
    const [tickets, setTickets] = useState(
        ticketTypes.map((ticket) => ({
            ...ticket,
            quantity: 0,
            selectedServices: [],
        })),
    )

    const [total, setTotal] = useState(0)

    useEffect(() => {
        const newTotal = tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)
        setTotal(newTotal)
    }, [tickets])

    const increaseQuantity = (id) => {
        setTickets((prev) =>
            prev.map((ticket) => (ticket.id === id ? { ...ticket, quantity: ticket.quantity + 1 } : ticket)),
        )
    }

    const decreaseQuantity = (id) => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket.id === id && ticket.quantity > 0 ? { ...ticket, quantity: ticket.quantity - 1 } : ticket,
            ),
        )
    }

    const proceedToRegistration = () => {
        if (total > 0 || tickets.some((t) => t.isFree && t.quantity > 0)) {
            sessionStorage.setItem("selectedTickets", JSON.stringify(tickets.filter((t) => t.quantity > 0)))
            sessionStorage.setItem("selectedServices", JSON.stringify(tickets.flatMap(t => t.services)))
            navigate("/register")
        } else {
            alert("Please select at least one ticket to continue")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10">Select Your Tickets</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-24">
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className={`rounded-xl shadow-lg text-white p-6 ${ticket.color} relative font-bold`}>

                            {/* Header */}

                            <h2 className="text-xl font-semibold mb-1">{ticket.name}</h2>
                            <p className="text-sm text-gray-200 mb-2">{ticket.id} DAYS ACCESS</p>

                            {/* Price */}

                            <div className="mb-4">
                                {ticket.oldPrice && (
                                    <span className="line-through text-sm text-gray-300 mr-2">USD {ticket.oldPrice}</span>
                                )}
                                <span className={`text-2xl font-bold ${ticket.isFree ? "text-green-300" : ""}`}>
                                    {ticket.isFree ? "FREE" : `USD ${ticket.price}`}
                                </span>
                                {!ticket.isFree && <span className="text-xs text-gray-300 ml-1">incl. 15% VAT</span>}
                            </div>

                            {/* Services */}

                            <ul className="text-sm space-y-1 mb-6">
                                {ticket.services.map((service) => (
                                    <li key={service.id} className={`flex items-center gap-2 ${service.included ? "text-white" : "text-gray-400"}`}>
                                        <span className="text-lg">
                                            <CheckCircle className={`${service.included ? "text-green-500" : "text-green-300"} w-4 h-4`} />
                                        </span>
                                        <span>{service.name}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Quantity and Button */}

                            <div className="flex justify-between items-center mt-auto">
                                {/* {!ticket.isFree && <> */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => decreaseQuantity(ticket.id)}
                                            className="text-xl px-3 py-1 bg-white text-black hover:bg-gray-200"
                                        >
                                            −
                                        </button>
                                        <span className="text-xl">{ticket.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(ticket.id)}
                                            className="text-xl px-3 py-1 bg-white text-black hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                {/* </>} */}

                                <button
                                    onClick={proceedToRegistration}
                                    className={`ml-auto px-4 py-2 rounded font-medium ${ticket.isFree
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                >
                                    BUY NOW
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky Total Footer */}

            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-700 shadow-lg text-white px-6 py-3 p-4 z-50">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div>
                        <span>Total:</span>
                        <span className="text-2xl font-bold ml-2">USD {total.toFixed(2)}</span>
                        <span className="text-sm ml-1">incl. VAT</span>
                    </div>
                    <button
                        onClick={proceedToRegistration}
                        disabled={total === 0 && !tickets.some((t) => t.isFree && t.quantity > 0)}
                        className={`flex items-center space-x-2 px-6 py-2 rounded transition-colors ${total === 0 && !tickets.some((t) => t.isFree && t.quantity > 0)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-white text-black"
                            }`}
                    >
                        <span>Buy Now{tickets.some((t) => t.quantity > 0) ? ` (${tickets.reduce((acc, t) => acc + t.quantity, 0)} Ticket${tickets.reduce((acc, t) => acc + t.quantity, 0) > 1 ? "s" : "" })`  : ""}</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
