"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
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
import MediaCoverage from "@/components/MediaCoverage";
import MobileMenuDrawer from "@/components/MobileMenuDrawer";
import {
  Eye,
  CheckCircle,
  RotateCcw,
  Clock,
  Frown,
  TrendingDown,
  AlertTriangle,
  KeyRound as Pound,
  Droplets,
  Activity,
  Leaf,
  Shield,
} from "lucide-react";

import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";

export default function HairRevitalizingTreatmentSection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  // Create a ref for the pricing section
  const pricingSectionRef = useRef(null);
  const beforeAfterSectionRef = useRef(null);
  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Visible Results",
      value: "Stronger, denser hair",
      icon: Eye,
    },
    {
      heading: "Results Timeline",
      value: "3–6 Months",
      icon: Clock,
    },
    {
      heading: "Recommended Sessions",
      value: "4+ Treatments",
      icon: RotateCcw,
    },
    {
      heading: "Session Frequency",
      value: "Every 2 Weeks",
      icon: Activity,
    },
    {
      heading: "Discomfort",
      value: "Minimal",
      icon: Frown,
    },
    {
      heading: "Downtime",
      value: "None",
      icon: TrendingDown,
    },
    {
      heading: "Side Effects",
      value: "Temporary redness",
      icon: AlertTriangle,
    },
    {
      heading: "Our Pricing",
      value: "From £600",
      description: "View all",
      icon: Pound,
    },
  ];

  const faqs = [
    {
      question: "What is Hair+ Revitalizing treatment?",
      answer:
        "Hair+ Revitalizing is a professional scalp treatment designed to strengthen hair, reduce thinning, and support natural growth. Delivered through mesotherapy or microneedling, it helps with a wide range of hair concerns from male and female pattern loss to postpartum and menopausal shedding.",
    },
    {
      question: "How long do the results last?",
      answer:
        "Results are long-lasting with proper maintenance. We recommend follow-up treatments every 6-12 months after the initial course to maintain optimal results.",
    },
    {
      question: "Is the procedure painful?",
      answer:
        "Most patients experience minimal discomfort. We use topical anesthetics when necessary to ensure your comfort throughout the procedure.",
    },
    {
      question: "What is the downtime?",
      answer:
        "There is no downtime. You can resume your normal activities immediately after treatment. Some temporary redness may occur but typically subsides within a few hours.",
    },
    {
      question: "Who performs the treatment?",
      answer:
        "All treatments are performed exclusively by our expert physicians and clinical specialists who are trained in advanced hair restoration techniques.",
    },
    {
      question: "How soon will I see results?",
      answer:
        "Initial improvements can often be seen within 4-6 weeks, with optimal results becoming apparent after 3-6 months as your hair goes through its natural growth cycle.",
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
                  Advanced Hair Restoration
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hair+ Revitalizing
                <br />
                for thicker, stronger
                <br />
                healthier hair
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Combat hair thinning and promote natural growth with our
                advanced scalp treatment at Derma Veritas.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-start gap-4 flex-wrap">
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
                  src="/wellness/Hair+ Revitalizing Treatment Vertical.jpg"
                  alt="Professional hair revitalizing treatment being administered"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-[-4px_4px_0_0_rgba(0,0,0,0.1)]">
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
              {cardData.slice(0, 4).map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div key={index} className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-600 text-sm font-light">
                        {card.heading}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-gray-900 mb-1">
                      {card.value}
                    </h3>
                    {card.description && (
                      <p className="text-gray-500 text-sm font-light">
                        {card.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              {cardData.slice(4, 8).map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div key={index} className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-600 text-sm font-light">
                        {card.heading}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-gray-900">
                      {card.value}
                    </h3>
                    {card.description && (
                      <p
                        onClick={scrollToPricing}
                        className="text-gray-500 text-sm font-light underline cursor-pointer hover:text-gray-700"
                      >
                        {card.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What is Hair+ Revitalizing Treatment?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hair+ Revitalizing is a professional scalp treatment designed to
              strengthen hair, reduce thinning, and support natural growth.
              Delivered through mesotherapy or microneedling, it helps with a
              wide range of hair concerns from male and female pattern loss to
              postpartum and menopausal shedding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Key Ingredients:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Phosphatidic Acid</span> –
                    Stimulates hair bulbs and prolongs the growth phase
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Vitamin B2 (Riboflavin)</span>{" "}
                    – Supports follicle energy and protection
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">
                      Superoxide Dismutase (SOD)
                    </span>{" "}
                    – A strong antioxidant that combats scalp stress
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Amino Acid Complex</span> –
                    Provides building blocks for stronger hair and scalp health
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Benefits:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Revitalizes scalp and hair follicles
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduces hair thinning and boosts density
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Suitable for both men and women
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Can be combined with PRP, light therapy, or threads for
                  enhanced results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Protocol Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Treatment Protocol
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              For optimal results, we recommend a structured treatment plan
              tailored to your specific hair concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Recommended Plan
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <span>
                    <strong>4+ sessions</strong> for optimal results
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <span>
                    Sessions spaced <strong>about 2 weeks apart</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <span>
                    Each session takes approximately{" "}
                    <strong>30-45 minutes</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Expected Results
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Stronger, denser, and healthier-looking hair over time
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduced hair shedding within 4-6 weeks
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Visible improvement in hair thickness after 3 months
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Optimal results achieved with complete treatment plan
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section ref={beforeAfterSectionRef} className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden bg-gray-100">
            <img
              src="/wellness/Hair+ Revitalizing Treatment Horizental.jpg"
              alt="Hair+ revitalizing results"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              About Hair+ Revitalizing
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Mesotherapy/microneedling-based scalp therapy to strengthen
              follicles and boost density.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Course of 4+ sessions; every ~2 weeks</li>
              <li>• Results develop over 3–6 months</li>
              <li>• No downtime</li>
            </ul>
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
                  Hair+ Revitalizing Treatment
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All treatments are performed exclusively by our expert
                  physicians and clinical specialists who are trained in
                  advanced hair restoration techniques. Our pricing reflects the
                  expertise and premium service you receive.
                </p>
                <p>
                  For optimal results, we recommend a course of 4 sessions as
                  part of a structured treatment plan.
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
              {/* Package Pricing */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Hair+ Revitalizing Treatment Packages
                  </h3>
                  <button
                    className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition rounded-lg"
                    onClick={() => setBookingOpen(true)}
                  >
                    BOOK
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">4-Session Package:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £600
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Single Session:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £180
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">
                      Maintenance Session (after initial package):
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      £150
                    </span>
                  </div>
                </div>
              </div>

              {/* Combination Treatments */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Enhanced Combination Treatments
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  For even better results, Hair+ Revitalizing can be combined
                  with:
                </p>

                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">With PRP:</span>
                    <span className="text-lg font-bold text-gray-900">
                      +£200
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">With Light Therapy:</span>
                    <span className="text-lg font-bold text-gray-900">
                      +£100
                    </span>
                  </div>
                </div>
              </div>
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
      <MediaCoverage />
    </>
  );
}
