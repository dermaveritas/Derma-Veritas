"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sapna Panesar",
    rating: 5,
    text: "Dr. Mofasher Nawaz was fantastic, couldn't recommend him more. Extremely professional and knowledgeable, highly trusted! His years of experience truly show and has helped me gain more confidence with my skin treatment. Thank you Derma Veritas!",
  },
  {
    id: 2,
    name: "Holly Newland",
    rating: 5,
    text: "I came to see Mr. A. Singh for my dermal filler treatment and I am over the moon with the results! Mr. Singh is so professional and knowledgeable about skin care. The whole team at Derma Veritas are absolutely lovely and so helpful.",
  },
  {
    id: 3,
    name: "Emma Thompson",
    rating: 5,
    text: "Highly recommend Derma Veritas. Dr. Mofasher's consultation was thorough and the anti-aging treatment was completely painless. Great aftercare support and natural-looking results.",
  },
  {
    id: 4,
    name: "Jessica Parker",
    rating: 5,
    text: "I've been coming to Derma Veritas for over two years now and the consistency in quality is outstanding. Both Dr. Nawaz and Mr. Singh really know what they're doing with skin treatments.",
  },
  {
    id: 5,
    name: "Rachel Green",
    rating: 5,
    text: "From booking to aftercare, everything at Derma Veritas was seamless. Mr. A. Singh's expertise in aesthetic procedures is evident - the results look so natural and I've received countless compliments.",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    rating: 5,
    text: "The professionalism at Derma Veritas is second to none. Dr. Mofasher made me feel completely at ease throughout my botox treatment. His medical background really shows in his approach.",
  },
  {
    id: 7,
    name: "Sophie Wilson",
    rating: 5,
    text: "Exceptional results from my skin rejuvenation treatment with Mr. Singh. The clinic environment is luxurious and both doctors are incredibly knowledgeable about the latest dermatology techniques.",
  },
  {
    id: 8,
    name: "Amy Roberts",
    rating: 5,
    text: "I was nervous about my first facial treatment but Dr. Mofasher and the team at Derma Veritas made me feel so comfortable. The results for my acne scarring are exactly what I hoped for.",
  },
  {
    id: 9,
    name: "Charlotte Davis",
    rating: 5,
    text: "Outstanding clinic with state-of-the-art equipment. Mr. A. Singh's consultation was detailed and honest about my skin concerns, and the pigmentation treatment results speak for themselves.",
  },
  {
    id: 10,
    name: "Victoria Brown",
    rating: 5,
    text: "Five stars isn't enough for Derma Veritas! Dr. Mofasher's expertise in aesthetic medicine has transformed my skin and boosted my confidence tremendously. I can't thank the team enough.",
  },
];

export default function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const autoScrollRef = useRef(null);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const translateX = -currentReview * 90 + 5; // 90% spacing between cards, 5% left margin
      sliderRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentReview]);

  // Auto-scroll functionality - reduced to 3 seconds
  useEffect(() => {
    if (!autoScrollEnabled) return;

    autoScrollRef.current = setInterval(() => {
      nextReview();
    }, 3000); // Changed to 3 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [autoScrollEnabled, currentReview]); // Added currentReview to dependencies

  // Pause auto-scroll when user interacts with the carousel
  const pauseAutoScroll = () => {
    setAutoScrollEnabled(false);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  // Resume auto-scroll after a period of inactivity
  const resumeAutoScroll = () => {
    setAutoScrollEnabled(true);
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    pauseAutoScroll();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextReview();
    } else if (isRightSwipe) {
      prevReview();
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);

    // Resume auto-scroll after 5 seconds
    setTimeout(resumeAutoScroll, 5000);
  };

  const scrollToTop = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
    >
      <h2 className="text-4xl font-light text-gray-900 mb-16 text-left tracking-wide px-12">
        What our clients have to say...
      </h2>

      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="flex-shrink-0 px-2"
              style={{ width: "90%" }}
            >
              <Card
                className={`p-12  border border-gray-200  min-h-[400px] flex flex-col bg-gray-200 justify-between w-full transition-all rounded-2xl duration-300 ${
                  index === currentReview
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-70"
                }`}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.1) -6px 8px 0px 0px",
                }}
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-orange-400 stroke-1"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {review.name}
                  </h3>

                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {review.text}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex items-center">
                    <div className="flex items-center text-3xl font-extrabold">
                      <span className="text-blue-400">G</span>
                      <span className="text-red-400">o</span>
                      <span className="text-yellow-400">o</span>
                      <span className="text-blue-400">g</span>
                      <span className="text-green-400">l</span>
                      <span className="text-red-400">e</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2 mt-12 justify-start px-12">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToReview(index);
              pauseAutoScroll();
              setTimeout(resumeAutoScroll, 5000); // Resume after 5 seconds
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentReview
                ? "bg-gray-800"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between mt-12 px-12">
        <div className="flex items-center gap-3">
          {[...Array(4)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-orange-400 stroke-1"
              fill="currentColor"
            />
          ))}
          <Star
            className="w-4 h-4 text-orange-400/50 stroke-1"
            fill="currentColor"
          />
          <span className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">
            Read Reviews
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              prevReview();
              pauseAutoScroll();
              setTimeout(resumeAutoScroll, 5000); // Resume after 5 seconds
            }}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-500 text-white shadow-md transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            onClick={() => {
              nextReview();
              pauseAutoScroll();
              setTimeout(resumeAutoScroll, 5000); // Resume after 5 seconds
            }}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 text-white shadow-md transition-all duration-300 hover:scale-105"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
