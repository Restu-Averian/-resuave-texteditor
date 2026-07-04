import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex-1 overflow-y-auto p-12 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
        <h1 className="text-8xl font-bold text-gray-900 tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mt-6">
          Page not found
        </h2>
        <p className="text-gray-500 mt-4 leading-relaxed">
          The page you're looking for doesn't exist
          <br />
          or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 bg-[#111111] hover:bg-black text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
        >
          Go to Overview <ArrowRight size={16} />
        </Link>
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-2 gap-4 mt-auto pt-12">
        <Link
          to="/props"
          className="border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-gray-300 transition-colors bg-white group"
        >
          <ArrowLeft
            size={20}
            className="text-gray-400 group-hover:-translate-x-1 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Previous</span>
            <span className="font-semibold text-gray-900">Props</span>
          </div>
        </Link>
        <Link
          to="https://github.com/Restu-Averian/-resuave-texteditor"
          target="_blank"
          className="border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors bg-white group"
        >
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Next</span>
            <span className="font-semibold text-gray-900">
              GitHub Repository
            </span>
          </div>
          <ArrowRight
            size={20}
            className="text-gray-400 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
