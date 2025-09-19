import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import ChildLayout from ".";
import { gtmId, headSnippet, bodySnippet } from "@/config/gtm";

export const metadata = {
  title: "Derma Veritas | Skin & Hair Clinic",
  description:
    "Derma Veritas is a premium skin, hair, and wellness clinic offering dermatology and aesthetic treatments with natural-looking results and patient safety at the core.",
  keywords: [
    "Derma Veritas",
    "Skin Clinic",
    "Hair Clinic",
    "Dermatology",
    "Aesthetic Treatments",
    "Wellness Clinic",
    "Laser Treatments",
    "Cosmetic Dermatology",
  ],
  authors: [{ name: "Derma Veritas" }],
  creator: "Derma Veritas",
  publisher: "Derma Veritas",

  icons: {
    icon: "/logo_white.png", // keep favicon for browser tab
    shortcut: "/logo_white.png",
  },

  metadataBase: new URL("https://dermaveritas.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: headSnippet }} />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}

        `}</style>
      </head>
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: bodySnippet }} />
        <ChildLayout>{children}</ChildLayout>
      </body>
    </html>
  );
}
