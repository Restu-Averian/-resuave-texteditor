import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Hero from "./components/hero";
import HighlightFeatures from "./components/highlight-features";
import PreviewCode from "./components/preview-code";
import PreviewProps from "./components/preview-props";
import BottomBadges from "./components/bottom-badges";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans relative overflow-x-hidden">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.5,
        }}
      ></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 py-6 z-10 flex flex-col gap-16">
        <header className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/icon.webp"
              alt="Resuave Editor Logo"
              className="w-8 h-8 rounded"
            />
            <span className="font-bold text-lg text-gray-900 tracking-tight">
              Resuave Editor
            </span>
          </Link>
          <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link
              to="/installation"
              className="hover:text-black transition-colors"
            >
              Docs
            </Link>
            <a
              href="https://github.com/Restu-Averian/-resuave-texteditor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              GitHub <ExternalLink size={14} />
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              NPM <ExternalLink size={14} />
            </a>
          </div>
        </header>

        <Hero />

        <HighlightFeatures />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <PreviewCode />

          <PreviewProps />
        </div>

        <BottomBadges />
      </div>
    </div>
  );
}
