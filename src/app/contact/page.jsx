"use client";

import React, { useState } from "react";
import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import {
  FaWhatsapp,
  FaTiktok,
  FaSnapchat,
  FaReddit,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    newsletter: false,
    ageConfirm: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { setBookingOpen } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/user/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          newsletter: false,
          ageConfirm: false,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1L27aEP3Fj/",
      icon: FaFacebookF,
      bg: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/derma_veritas?igsh=MTNtcmFjY254bWN4dw==",
      icon: FaInstagram,
      bg: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@derma.veritas?_t=ZS-8xw9tsrJMEJ&_r=1",
      icon: FaTiktok,
      bg: "bg-black hover:bg-gray-800",
    },
    {
      name: "Snapchat",
      href: "https://www.snapchat.com/add/dermaveritas?share_id=XRGq8aGebuM&locale=en-US",
      icon: FaSnapchat,
      bg: "bg-yellow-400 hover:bg-yellow-500",
      iconClass: "text-gray-900",
    },
    {
      name: "Reddit",
      href: "https://www.reddit.com/user/Derma-Veritas",
      icon: FaReddit,
      bg: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-5xl mt-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-muted-foreground/30 flex-1 max-w-20"></div>
            <span className="text-sm text-muted-foreground font-medium">
              Contact Derma Veritas
            </span>
            <div className="h-px bg-muted-foreground/30 flex-1 max-w-20"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            See below for how to contact Derma Veritas to start your journey in
            enhancing your natural beauty.
          </p>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Landline */}
          <a
            href="tel:01902243398"
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-700 transition-colors">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Landline</p>
              <p className="text-sm font-semibold text-foreground">01902 243398</p>
            </div>
          </a>

          {/* Mobile */}
          <a
            href="tel:+447741340615"
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-700 transition-colors">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Mobile</p>
              <p className="text-sm font-semibold text-foreground">+44 7741 340615</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/447741340615"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
              <FaWhatsapp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">WhatsApp</p>
              <p className="text-sm font-semibold text-foreground">Message Us</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@dermaveritas.com"
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-700 transition-colors">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Email</p>
              <p className="text-sm font-semibold text-foreground">info@dermaveritas.com</p>
            </div>
          </a>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-muted-foreground/30 flex-1 max-w-12"></div>
                <span className="text-sm text-muted-foreground font-medium">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">
                Get in touch with our team today
              </h2>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 font-medium rounded-lg"
                onClick={() => setBookingOpen(true)}
              >
                BOOK A CONSULTATION
              </Button>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-foreground">Business Hours</h3>
              </div>
              <div className="text-sm text-muted-foreground space-y-1 pl-8">
                <p>Monday - Friday: 11:00 - 19:00</p>
                <p>Saturday: 8:00 - 18:00</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-foreground">Our Location</h3>
              </div>
              <div className="text-sm text-muted-foreground pl-8">
                <p>Unit 2 Oak Tree House</p>
                <p>Oak Tree Rise, Codsall</p>
                <p>Wolverhampton, WV8 1DT</p>
                <p>United Kingdom</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className={`${social.bg} w-10 h-10 rounded-full flex items-center justify-center transition-colors text-white`}
                    aria-label={social.name}
                  >
                    <social.icon
                      className={`w-4 h-4 ${social.iconClass || ""}`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="space-y-6">
            {/* Status Message */}
            {submitStatus && (
              <div
                className={`p-4 rounded-lg ${submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                  }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Your Name*
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your first & last name?"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address*
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone No*
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Please provide your mobile..."
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={6}
                  className="w-full resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      handleInputChange("newsletter", checked)
                    }
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    I would like to occasionally receive news & offers from
                    Derma Veritas.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
