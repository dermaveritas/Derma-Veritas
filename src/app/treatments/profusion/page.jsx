"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import ClinicsModal from "@/components/ClinicsModal";
import PriceCard from "@/components/pricecard/price-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Play } from "lucide-react";
import BeforeAfterSection from "@/components/before-after-section";
import Footer from "@/components/Footer";
import ClubMembership from "@/components/ClubMembership";
import {
  Eye,
  CheckCircle,
  RotateCcw,
  Clock,
  Frown,
  TrendingDown,
  AlertTriangle,
  KeyRound as Pound,
} from "lucide-react";

import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";

export default function ProFusionSection() {
  // Changed from HandRejuvenationSection
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);

  // Create a ref for the pricing section
  const pricingSectionRef = useRef(null);
  const beforeAfterSectionRef = useRef(null);
  const { bookingOpen, setBookingOpen } = useStore();

  // Update the cardData array to match package information
  const cardData = [
    {
      heading: "Results Seen",
      value: "Immediate",
      description: "Progressive improvement with sessions",
    },
    {
      heading: "Results Last",
      value: "4-6 weeks",
    },
    {
      heading: "No. of Sessions",
      value: "6 recommended",
    },
    {
      heading: "Procedure Time",
      value: "40-75 minutes",
    },
    {
      heading: "Pain",
      value: "None",
      description: "Relaxing treatment",
    },
    {
      heading: "Downtime",
      value: "None",
    },
    {
      heading: "Side Effects",
      value: "Minimal redness",
    },
    {
      heading: "Our Pricing",
      value: "From £150",
      description: "View all",
    },
  ];

  // Update treatmentOptions to match package prices and details
  const treatmentOptions = [
    {
      title: "Signature + RF",
      price: "£150 per session",
      results: "Deep cleansing and hydration with RF tightening",
      duration: "4-6 weeks",
      sessions: "Package of 6 available (£750)",
      time: "40 minutes",
      downtime: "None",
    },
    {
      title: "Deluxe + RF",
      price: "£180 per session",
      results: "Enhanced results with custom booster and LED therapy",
      duration: "4-6 weeks",
      sessions: "Package of 6 available (£900)",
      time: "50 minutes",
      downtime: "None",
    },
    {
      title: "Platinum + RF",
      price: "£210 per session",
      results: "Advanced treatment with lymphatic drainage",
      duration: "4-6 weeks",
      sessions: "Package of 6 available (£1,050)",
      time: "70 minutes",
      downtime: "None",
    },
    {
      title: "Elite – Cellular Repair & Lift",
      price: "£250 per session",
      results: "Ultimate treatment with enhanced serums",
      duration: "4-6 weeks",
      sessions: "Package of 6 available (£1,250)",
      time: "75 minutes",
      downtime: "None",
    },
  ];

  // Update faqs to match package information
  const faqs = [
    {
      question: "What is ProFusion HydraFacial?",
      answer:
        "ProFusion HydraFacial is an advanced skin rejuvenation treatment using state-of-the-art devices that combine cutting-edge technology with clinical expertise. It uses specialized serums, creams, and boosters to target unique skin concerns with remarkable results.",
    },
    {
      question: "How often should I get a ProFusion HydraFacial?",
      answer:
        "For optimal results, we recommend starting with a series of treatments spaced 4-6 weeks apart. Many clients then transition to maintenance treatments every 8-12 weeks depending on their skin goals and concerns.",
    },
    {
      question: "Is there any downtime after the treatment?",
      answer:
        "There is minimal to no downtime with ProFusion HydraFacial. You may experience slight redness immediately after the treatment, but this typically subsides within a few hours. You can resume normal activities immediately after your session.",
    },
    {
      question: "Who is a good candidate for ProFusion HydraFacial?",
      answer:
        "Almost anyone can benefit from ProFusion HydraFacial treatments. They are suitable for all skin types and address various concerns including fine lines, wrinkles, hyperpigmentation, congested pores, oily skin, and dull complexion.",
    },
    {
      question: "Can I combine ProFusion HydraFacial with other treatments?",
      answer:
        "Yes, ProFusion HydraFacial can be effectively combined with other treatments for enhanced results. Our experts will create a customized treatment plan based on your skin goals during your consultation.",
    },
  ];

  // Function to scroll to pricing section
  const scrollToPricing = () => {
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToBeforeAfter = () => {
    if (beforeAfterSectionRef.current) {
      beforeAfterSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Content */}
            <div className="text-center md:text-left flex flex-col justify-center">
              {/* Small Label with Line */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-12 h-px bg-gray-400"></div>
                <span className="text-gray-600 text-sm font-medium tracking-wide">
                  Advanced Skin Rejuvenation
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                ProFusion
                <br />
                HydraFacial
                <br />
                Treatment
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Ultimate skin rejuvenation using state-of-the-art ProFusion
                devices that combine cutting-edge technology with clinical
                expertise.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* VIEW PRICES - Updated to call scrollToPricing */}
                <button
                  onClick={scrollToPricing}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-lg tracking-wider hover:bg-[#272728] hover:text-white transition-colors"
                >
                  VIEW PRICES
                  <span className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-[4/5] w-full max-w-lg">
                <img
                  src="/pacakage/Pro-Fusion.jpg"
                  alt="Professional ProFusion HydraFacial treatment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What is ProFusion HydraFacial?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ProFusion HydraFacial represents the pinnacle of skin rejuvenation
              technology. Our state-of-the-art devices combine cutting-edge
              technology with clinical expertise, using specialized serums,
              creams, and boosters that target your unique skin concerns for
              remarkable results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Key Benefits:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Deep cleansing and hydration
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Exfoliation and extraction without irritation
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  RF technology for skin tightening
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Customizable for specific skin concerns
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Immediate results with no downtime
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Why Choose Our ProFusion Treatment:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Latest technology with advanced RF capabilities
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Performed by certified skincare specialists
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Personalized treatment plans for your skin type
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Medical-grade products and equipment
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Luxurious experience with exceptional results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ConsultationSection />

      {/* Pricing Section with ref */}
      <section
        ref={pricingSectionRef}
        className="py-12 md:py-20 px-4"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-gray-600 font-medium">
                  Hand Rejuvenation Cost
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All treatments are performed exclusively by our expert
                  physicians and clinical pharmacy leads who are
                  industry-leading trainers. Our pricing reflects the expertise
                  and premium service you receive.
                </p>
                <p>
                  If you would like to discuss any of our treatments, please
                  feel free to{" "}
                  <button className="underline hover:text-gray-900 transition-colors">
                    get in touch
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {treatmentOptions.map((treatment, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-semibold text-gray-900">
                      {treatment.title}
                    </h3>
                    <span className="text-lg font-bold text-gray-900">
                      {treatment.price}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Visible Results:</span>
                      <span className="text-gray-900">{treatment.results}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-gray-900">
                        {treatment.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sessions:</span>
                      <span className="text-gray-900">
                        {treatment.sessions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Procedure Time:</span>
                      <span className="text-gray-900">{treatment.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downtime:</span>
                      <span className="text-gray-900">
                        {treatment.downtime}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full mt-4 px-4 py-2 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition"
                    onClick={() => setBookingOpen(true)}
                    data-treatment="profusion-hydrafacial"
                  >
                    BOOK NOW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-gray-900 focus:outline-none"
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="relative px-6 py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-lg tracking-wide"
            onClick={() => (window.location = "/contact")}
          >
            ASK A QUESTION
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
          </button>
        </div>
      </section>

      <ClubMembership />
    </>
  );
}
