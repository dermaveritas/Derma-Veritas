"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/zustand";
import ConsultationSection from "@/components/consultation-section";

// Function to generate slug from treatment name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

// Function to get correct href for each treatment
const getTreatmentHref = (treatmentName) => {
  const treatmentMap = {
    Endolift: "/treatments/endolift",
    "Eight Point Facelift": "/menu/injectables/8-point-facelift",
    "Ablative CO2 Resurfacing": "/treatments/ablative",
    "Fractional CO2 Resurfacing": "/treatments/co2",
    "Radio Frequency Microneedling": "/treatments/rf-microneedling",
    "Pro Fusion": "/treatments/profusion",
    "V Hacker": "/treatments/v-hacker",
    "Bio Hacking Formula": "/treatments/exosome-therapy",
    Exosomes: "/treatments/exosome-therapy",
    "Anti-Wrinkle": "/menu/injectables/anti-wrinkle-treatment",
    PRP: "/treatments/prp-therapy",
    Polynucleotide: "/treatments/polynucleotide",
    Fillers: "/menu/injectables/dermal-fillers",
    Profhilo: "/menu/injectables/profhilo",
    "Skin Fill Bacio": "/menu/injectables/skinfill-bacio",
    "Hair PRP": "/treatments/prp-therapy",
    "Hair Polynucleotide":
      "/menu/injectables/polynucleotides-hair-loss-treatment",
    "EXO SIGNAL": "/treatments/exosignal",
    "Hair + Revitalizing Formula": "/treatments/hair-revitalizing",
    "Prescription Hair Treatments": "/treatments/prescriptionhair",
    "Weight Loss Modulators": "/treatments/weightloss",
    "Skin Tx and Care": "/treatments/prescriptionskincare",
  };

  return treatmentMap[treatmentName] || "#";
};

// Updated treatment categories based on navbar treatments
const treatmentCategories = [
  {
    id: "non-surgical-enhancement",
    name: "Non-surgical Enhancement",
    treatments: [
      {
        id: 1,
        name: "Endolift",
        description:
          "Minimally invasive laser treatment for skin tightening and lifting.",
        image:
          "https://img.freepik.com/free-photo/overhead-view-pen-spiral-notebook-stethoscope-grey-background_23-2148129623.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 2,
        name: "Eight Point Facelift",
        description:
          "A non-surgical facelift technique that uses dermal fillers to restore volume and lift the face.",
        image: "https://thumbs.dreamstime.com/b/medical-treatment-26268599.jpg",
      },
      {
        id: 3,
        name: "Ablative CO2 Resurfacing",
        description:
          "Advanced CO2 laser treatment for skin resurfacing and rejuvenation.",
        image:
          "https://img.freepik.com/free-photo/stethoscope-hanging-from-doctor-s-gown_1232-646.jpg?semt=ais_hybrid&w=740&q=80",
      },
    ],
  },
  {
    id: "skin-perfecting",
    name: "Skin Perfecting",
    treatments: [
      {
        id: 4,
        name: "Fractional CO2 Resurfacing",
        description:
          "Advanced CO2 laser treatment for skin resurfacing and rejuvenation.",
        image:
          "https://img.freepik.com/free-photo/stethoscope-hanging-from-doctor-s-gown_1232-646.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 5,
        name: "Radio Frequency Microneedling",
        description:
          "Combine microneedling with radio frequency for enhanced skin tightening and rejuvenation.",
        image:
          "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 6,
        name: "Pro Fusion",
        description:
          "Advanced skin treatment for enhanced facial contours and volume.",
        image:
          "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      },
    ],
  },
  {
    id: "age-defying",
    name: "Age Defying",
    treatments: [
      {
        id: 7,
        name: "V Hacker",
        description:
          "Innovative treatment for targeted body contouring and fat reduction.",
        image: "https://thumbs.dreamstime.com/b/medical-treatment-26268599.jpg",
      },
      {
        id: 8,
        name: "Bio Hacking Formula",
        description:
          "Advanced regenerative therapy using exosomes to promote healing and rejuvenation.",
        image:
          "https://img.freepik.com/free-photo/stethoscope-hanging-from-doctor-s-gown_1232-646.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 9,
        name: "Exosomes",
        description:
          "Advanced regenerative therapy using exosomes to promote healing and rejuvenation.",
        image:
          "https://img.freepik.com/free-photo/stethoscope-hanging-from-doctor-s-gown_1232-646.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 10,
        name: "Anti-Wrinkle",
        description:
          "Reduce the appearance of fine lines and wrinkles with our advanced anti-wrinkle treatments.",
        image:
          "https://media.istockphoto.com/id/1437830105/photo/cropped-shot-of-a-female-nurse-hold-her-senior-patients-hand-giving-support-doctor-helping.jpg?s=612x612&w=0&k=20&c=oKR-00at4oXr4tY5IxzqsswaLaaPsPRkdw2MJbYHWgA=",
      },
      {
        id: 11,
        name: "PRP",
        description:
          "Platelet-rich plasma therapy for skin rejuvenation and healing.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOphOwuZ-j4tfu-zKK3LmpjOay_rKdLhFsvzC0pS28rArMdh_dPQJlvuDvRFWlCXLEv5k&usqp=CAU",
      },
      {
        id: 12,
        name: "Polynucleotide",
        description:
          "Polynucleotide treatments for skin regeneration and revitalization.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOphOwuZ-j4tfu-zKK3LmpjOay_rKdLhFsvzC0pS28rArMdh_dPQJlvuDvRFWlCXLEv5k&usqp=CAU",
      },
    ],
  },
  {
    id: "facial-contouring",
    name: "Facial Contouring",
    treatments: [
      {
        id: 13,
        name: "Fillers",
        description:
          "Restore volume and enhance facial contours with our premium dermal fillers.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalrdoQZBQZTJVkZjIf34lWjfB1hyyfRyeFV_ndZaxRiO8cjnQvrcGwvVBUJ4BluGd2bQ&usqp=CAU",
      },
      {
        id: 14,
        name: "Profhilo",
        description:
          "An innovative skin remodelling treatment that improves skin quality and elasticity.",
        image:
          "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 15,
        name: "Skin Fill Bacio",
        description:
          "Advanced skinfill treatment for enhanced facial contours and volume.",
        image:
          "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      },
    ],
  },
  {
    id: "hair-enhancements",
    name: "Hair Enhancements",
    treatments: [
      {
        id: 16,
        name: "Hair PRP",
        description:
          "Platelet-rich plasma therapy for hair growth and rejuvenation.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOphOwuZ-j4tfu-zKK3LmpjOay_rKdLhFsvzC0pS28rArMdh_dPQJlvuDvRFWlCXLEv5k&usqp=CAU",
      },
      {
        id: 17,
        name: "Hair Polynucleotide",
        description:
          "Stimulate hair growth and improve hair density with our advanced polynucleotide therapy.",
        image:
          "https://img.freepik.com/free-photo/overhead-view-pen-spiral-notebook-stethoscope-grey-background_23-2148129623.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 18,
        name: "EXO SIGNAL",
        description:
          "Advanced hair treatment using exosome technology for hair growth and revitalization.",
        image:
          "https://img.freepik.com/free-photo/overhead-view-pen-spiral-notebook-stethoscope-grey-background_23-2148129623.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 19,
        name: "Hair + Revitalizing Formula",
        description:
          "Comprehensive hair revitalizing treatment for healthier, stronger hair.",
        image:
          "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 20,
        name: "Prescription Hair Treatments",
        description:
          "Clinically tailored therapies designed to support hair growth, scalp health, and long-term hair maintenance.",
        image:
          "https://media.istockphoto.com/id/1437830105/photo/cropped-shot-of-a-female-nurse-hold-her-senior-patients-hand-giving-support-doctor-helping.jpg?s=612x612&w=0&k=20&c=oKR-00at4oXr4tY5IxzqsswaLaaPsPRkdw2MJbYHWgA=",
      },
    ],
  },
  {
    id: "others",
    name: "Others",
    treatments: [
      {
        id: 21,
        name: "Weight Loss Modulators",
        description:
          "Professional therapy designed to support weight management, metabolic balance, and overall wellbeing.",
        image:
          "https://media.istockphoto.com/id/1437830105/photo/cropped-shot-of-a-female-nurse-hold-her-senior-patients-hand-giving-support-doctor-helping.jpg?s=612x612&w=0&k=20&c=oKR-00at4oXr4tY5IxzqsswaLaaPsPRkdw2MJbYHWgA=",
      },
      {
        id: 22,
        name: "Skin Tx and Care",
        description:
          "Clinically guided therapies tailored to target specific skin concerns such as acne, hyperpigmentation, and sensitivity.",
        image:
          "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      },
    ],
  },
];

export default function TreatmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const { bookingOpen, setBookingOpen } = useStore();

  // Filter treatments based on search query and category
  const filteredTreatments = treatmentCategories.flatMap((category) => {
    if (selectedCategory !== "all" && selectedCategory !== category.id) {
      return [];
    }

    return category.treatments
      .filter(
        (treatment) =>
          treatment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          treatment.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      .map((treatment) => ({ ...treatment, category: category.name }));
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const categoryButtonVariants = {
    rest: {
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-12">
              <Image
                src="/logo_black.png"
                alt="DermaVeritas Logo"
                width={96}
                height={96}
                className="mx-auto"
              />
            </div>

            <h1 className="text-5xl lg:text-7xl font-light text-center mb-8">
              <span className="text-black">Our</span>{" "}
              <span className="text-gray-400">Treatments</span>
            </h1>

            <p className="text-gray-600 text-xl leading-relaxed text-center max-w-4xl mb-12">
              Discover our comprehensive range of aesthetic treatments designed
              to enhance your natural beauty and help you achieve your aesthetic
              goals.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-8 bg-gray-50 sticky top-0 z-10 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-800 cursor-text"
              />
            </div>

            {/* Filter Toggle for Mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              <Filter className="w-5 h-5" />
              Filters
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <motion.button
                    variants={categoryButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === "all"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    All
                  </motion.button>
                  {treatmentCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      variants={categoryButtonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category.id
                          ? "bg-gray-800 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Filters (Desktop) */}
          <motion.div
            className="hidden md:flex flex-wrap gap-2 mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={categoryButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === "all"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All
            </motion.button>
            {treatmentCategories.map((category) => (
              <motion.button
                key={category.id}
                variants={categoryButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category.id
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Treatments Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTreatments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <h3 className="text-2xl font-medium mb-4 text-gray-800">
                No treatments found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mb-8"
              >
                <h2 className="text-2xl font-light text-gray-800">
                  {selectedCategory === "all"
                    ? "All Treatments"
                    : treatmentCategories.find((c) => c.id === selectedCategory)
                        ?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredTreatments.length}{" "}
                  {filteredTreatments.length === 1 ? "treatment" : "treatments"}{" "}
                  found
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredTreatments.map((treatment) => (
                  <motion.div
                    key={treatment.id}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={treatment.image}
                        alt={treatment.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=Treatment+Image";
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-light text-gray-800">
                          {treatment.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {treatment.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {treatment.category}
                        </span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href={getTreatmentHref(treatment.name)}
                            className="flex items-center text-gray-800 hover:text-gray-600 font-medium"
                          >
                            Learn more
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-800 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Book a consultation with our experts to find the perfect treatment
            for you
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gray-800 text-white  text-lg font-medium hover:bg-gray-700 transition-colors rounded-lg"
            onClick={() => setBookingOpen(true)}
          >
            Book a Consultation
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
