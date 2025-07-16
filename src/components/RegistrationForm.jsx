
import React, { useState, useEffect } from "react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { X } from 'lucide-react';
import background from "../assets/image 4.png";
import Header from "../assets/Group 85.png";
import { useNavigate } from "react-router-dom";



export default function RegistrationForm() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    region: '',
    email: '',
    confirmEmail: '',
    nationality: '',
    mobile: '',
    companyName: '',
    jobTitle: '',
    companyType: '',
    industry: '',
    selectedProducts: '',
    promoCode: '',
    agreeTerms: '',
    agreeMarketing: '',
  })


  const countryCodes = [
    { code: "+971", label: "🇦🇪" },
    { code: "+1", label: "🇺🇸" },
    { code: "+91", label: "🇮🇳" },
    { code: "+44", label: "🇬🇧" },
    { code: "+81", label: "🇯🇵" },
    { code: "+61", label: "🇦🇺" },
    { code: "+49", label: "🇩🇪" },
    { code: "+33", label: "🇫🇷" },
    { code: "+39", label: "🇮🇹" },
    { code: "+86", label: "🇨🇳" },
  ];


  const [currentStep, setCurrentStep] = useState(1)

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }


  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 2) {
      navigate('/thank-you')
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  //  Modal Open 

  const [modal, setModal] = useState({
    product: false
  });

  // Products

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProducts, setSelectedProducts] = useState([])

  const productsList = [
    { id: 1, name: "Global Leaders Forum NEW", days: 3 },
    { id: 2, name: "GITEX Main Stage", days: 1 },
    { id: 3, name: "Artificial Intelligence & Robotics", days: 1 },
    { id: 4, name: "Future Health NEW", days: 2 },
    { id: 5, name: "Cybersecurity", days: 1 },
    { id: 6, name: "Future Health NEW", days: 2 },
    { id: 7, name: "Digital Cities", days: 1 },
    { id: 8, name: "Fintech", days: 1 },
    { id: 9, name: "Energy Transition", days: 1 },
    { id: 10, name: "Intelligent Connectivity", days: 1 },
    { id: 11, name: "Digital Finance", days: 1 },
    { id: 12, name: "Future Mobility", days: 1 },
  ]

  const filteredProducts = searchQuery
    ? productsList.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : productsList

  const handleProductToggle = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleApply = () => {
    onApply(selectedProducts)
    onClose()
  }

  const modalProductList = [
    { id: 13, name: "Global Leaders Forum !NEW (3 Days)" },
    { id: 14, name: "GITEX Main Stage" },
    { id: 15, name: "Artificial Intelligence & Robotics (15)" },
    { id: 16, name: "Future Health !NEW (2 Days)" },
    { id: 17, name: "Cybersecurity (4 Days)" },
    { id: 18, name: "Future Health !NEW (2 Days)" },
    { id: 19, name: "AI Everything (4 Days)" },
    { id: 20, name: "Future Health !NEW (2 Days)" },
  ];

  const modalProductSubList = [
  { id: 21, name: "Digital Cities", days: 1 },
  { id: 22, name: "Edtech", days: 1 },
  { id: 23, name: "Energy Transition", days: 1 },
  { id: 24, name: "Intelligent Connectivity", days: 1 },
  { id: 25, name: "Digital Finance", days: 1 },
  { id: 26, name: "Future Mobility", days: 1 },
];


  const mainCategories = [
    "Artificial Intelligence & Robotics",
    "Cybersecurity",
    "Future Mobility",
    "Fintech",
    "Health Tech",
  ];

  const subCategories = [
    "Edge Computing",
    "Cloud Computing",
    "Cognitive Computing",
  ];

  const [selectedMain, setSelectedMain] = useState(mainCategories[0]);
  const [selectedSub, setSelectedSub] = useState(subCategories[0]);

  //  Promo Code

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [error, setError] = useState("")


  // Mock promo codes for demonstration

  const validPromoCodes = {
    GITEX15: { discount: 19, type: "percentage", discountAmount: 40, appliedTo: "2 lowest-priced tickets" },
    SAVE20: { discount: 20, type: "percentage", discountAmount: 15, appliedTo: "all tickets" },
    DISCOUNT50: { discount: 50, type: "fixed", discountAmount: 20, appliedTo: "premium tickets" },
  }

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setError("Please enter a promo code");
      return;
    }

    const promo = validPromoCodes[promoCode.toUpperCase()];

    if (promo) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: promo.discount,
        type: promo.type,
        appliedTo: promo.appliedTo,
      });

      setError("");
    } else {
      setError("Invalid promo code. Please try again.");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoCode("")
    setError("")
    onPromoRemoved?.()
  }


  const Stepper = () => (
    <div className="flex items-center justify-center mb-2">
      {[1, 2].map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step <= currentStep
              ? "bg-green-600 border-green-600 text-white"
              : "bg-white border-gray-300 text-gray-400"
              }`}
          >
            {step < currentStep ? <Check className="w-4 h-4" /> : <span className="text-sm font-medium">{step}</span>}
          </div>
          {index < 1 && <div className={`w-16 h-0.5 mx-2 ${step < currentStep ? "bg-green-600" : "bg-gray-300"}`} />}
        </React.Fragment>
      ))}
    </div>
  )


  const Step1 = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Registration Information 1</h2>
        <div className="text-sm">
          <span className="bg-green-700 px-2 py-1 rounded">PREMIUM TICKET - FREEIncl. 19% VAT</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name <span className="text-red-500"><span className="text-red-500">*</span></span></label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country of residence <span className="text-red-500">*</span></label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.country}
                onChange={(e) => updateFormData("country", e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.region}
                onChange={(e) => updateFormData("region", e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address <span className="text-red-500">*</span></label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Email address</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.confirmEmail}
                onChange={(e) => updateFormData("confirmEmail", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.nationality}
                onChange={(e) => updateFormData("nationality", e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="UAE">Emirati</option>
                <option value="US">American</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number <span className="text-red-500">*</span></label>
              <div className="flex">
                <select className="p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out">
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.label} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                  value={formData.mobile}
                  onChange={(e) => updateFormData("mobile", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company name <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.companyName}
                onChange={(e) => updateFormData("companyName", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job title <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.jobTitle}
                onChange={(e) => updateFormData("jobTitle", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company type <span className="text-red-500">*</span></label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.companyType}
                onChange={(e) => updateFormData("companyType", e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="Startup">Startup</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry <span className="text-red-500">*</span></label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={formData.industry}
                onChange={(e) => updateFormData("industry", e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                What products & services are you interested in? <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setModal({ product: true })}
                className="bg-gradient-to-r from-red-700 via-red-800 to-black text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition"
              >
                SELECT SOLUTIONS/PRODUCTS
              </button>
            </div>

            {/* Main Categories */}

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-800 mb-2">Main Categories</p>
              <div className="flex flex-wrap gap-2">
                {mainCategories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedMain(cat)}
                    className={`px-4 py-1 rounded-full text-sm font-medium ${selectedMain === cat
                      ? "bg-violet-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub Categories */}

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-800 mb-2">Sub Categories</p>
              <div className="flex flex-wrap gap-2">
                {subCategories.map((sub, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSub(sub)}
                    className={`px-4 py-1 rounded-full text-sm font-medium border ${selectedSub === sub
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-black-600 font-semibold mb-3">Select Workshop (Maximum 6 can Select)</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {productsList.map((product, index) => (
                <label key={index} className="flex items-center space-x-2 text-md font-semibold">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-black-500 text-green-600 focus:ring-green-500"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductToggle(product.id)}
                  />
                  <span>{product.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="bg-green-600 text-white p-2 rounded text-center text-sm font-medium mb-4">
            Registration Information 1
          </div>
          <div className="space-y-2 text-sm text-gray-600 text-center">
            <div>FULL NAME</div>
            <div>JOB TITLE</div>
            <div>COMPANY NAME</div>
            <div>COUNTRY OF RESIDENCE</div>
          </div>
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-500 mb-2">BADGE CATEGORY</div>
            <div className="text-2xl font-bold text-gray-800">VISITOR</div>
          </div>
        </div>
      </div>
    </div>
  )

  const Step2 = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-green-600 text-white p-4">
        <h2 className="text-xl font-semibold">Registration Summary</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center py-3 border-b">
          <span className="font-medium">PREMIUM TICKET x 2</span>
          <span className="font-bold">EUR 50.19</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b font-bold">
          <span>Student Ticket Access On Day 3 Only</span>
          <span>EUR 30.40 SUBJECT TO APPROVAL Incl. 19%</span>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <label className="block text-sm font-medium text-gray-700 mb-2">Have a promo code?</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => { handleApplyPromo() }}>APPLY</button>
          </div>

          {/*  Error Notification */}

          {error && (
            <>
              <p className="text-red-600 text-sm italic py-2">{error}</p>

              <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Try these promo codes:</h3>
                <ul className="text-sm space-y-1">
                  {Object.entries(validPromoCodes).map(([code, details]) => (
                    <li key={code}>
                      •{" "}
                      <code className="bg-gray-200 px-1 rounded">{code}</code> -{" "}
                      {details.type === "percentage"
                        ? `${details.discount}% discount`
                        : `€${details.discount} fixed discount`}{" "}
                      on {details.appliedTo}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}


          {promoCode !== "" && appliedPromo?.code && error === "" && <>
            <div className="space-y-3">
              {/* Success Message */}
              <div className="text-green-700 font-medium mt-2">
                Promo code '{appliedPromo.code}' applied successfully! Applied to {appliedPromo.appliedTo}!
              </div>

              {/* Promo Details */}
              <div className="bg-white p-3 rounded border space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-bold">Promo code applied:</span>
                  <span className="font-medium text-green-600">{appliedPromo.code}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-bold">Promo code applied:</span>
                  <span className="font-medium text-green-600">
                    -{appliedPromo.discount}% (EUR {appliedPromo.discountAmount} incl. VAT)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-bold">Applied to:</span>
                  <span className="font-medium text-green-600">{appliedPromo.appliedTo}</span>
                </div>

                {/* Remove Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleRemovePromo}
                    className="border border-red-600 text-red-500 px-4 py-1 rounded hover:bg-red-50 text-sm font-medium"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>

          </>}
        </div>


        <div className="text-right">
          <div className="text-2xl font-bold">
            Total: EUR 300 <span className="text-sm text-gray-500">inc tax VAT</span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
              checked={formData.agreeTerms}
              onChange={(e) => updateFormData("agreeTerms", e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              I have read and accept the{" "}
              <a href="#" className="text-blue-600 underline">
                terms and conditions
              </a>
              ,{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy Policy
              </a>{" "}
              and consent that attendees under the age of 21 will not be admitted, and admission to the exhibition is
              restricted to trade and business professionals only, and students above 16 and below 18 can attend only if
              accompanied by school or faculty member.<span className="text-red-500">*</span>
            </span>
          </label>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
              checked={formData.agreeMarketing}
              onChange={(e) => updateFormData("agreeMarketing", e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              I hereby consent the use of my data by the organiser, exhibitors and sponsors of DMTC & KAOUN
              International to delivering services and for marketing purposes. I am aware that I can object to the
              sending of newsletters at any time.<span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
      <div className="relative py-8">
        <Stepper />
      </div>

      <div className="mx-auto px-4 py-5">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}

        <div className="flex justify-center space-x-4 mt-5">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>
          )}
          <button
            onClick={nextStep}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
          >
            <span>{currentStep === 2 ? "SUBMIT" : "NEXT"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {modal.product && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">

            {/* Header */}
            <div className="relative p-4 text-white">
              <div
                className="absolute inset-0 bg-repeat bg-cover"
                style={{ backgroundImage: `url(${Header})` }}
              />
              <div className="flex justify-between items-center relative z-10">
                <h2 className="text-xl font-bold tracking-wide">SELECT SOLUTIONS/PRODUCTS</h2>
                <button
                  onClick={() => setModal({ product: false })}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-40 hover:bg-opacity-30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">

              {/* Search */}

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Try Product/Service"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <p className="text-gray-700 mb-4">
                I Am Interested In Sourcing The Following Solutions/Products? (Select Top 5) * Please Ensure
                You Have Chosen At Least One Category In Each Section
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-4">
                  {modalProductList.map((product) => (
                    <label key={product.id} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 rounded border-black text-green-600 focus:ring-green-500"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleProductToggle(product.id)}
                      />
                      <span className="text-black">
                        {product.name} {product.days && `(${product.days} Days)`}
                        {product.count && <span className="text-gray-700 ml-1">({product.count})</span>}
                      </span>
                    </label>
                  ))}
                </div>

                {selectedProducts.includes(13) && (
                  <div className="space-y-2">
                    {modalProductSubList.map((item, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                         className="mt-1 h-5 w-5 rounded border-black text-green-600 focus:ring-green-500"
                         checked={item.id == 23}
                        />
                        <span className="text-gray-800">{item.name} {item.days && `(${item.days} Days)`}
                        {item.count && <span className="text-gray-700 ml-1">({item.count})</span>}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setModal({ product: false })}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
              >
                CANCEL
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
