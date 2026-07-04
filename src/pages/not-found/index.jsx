import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import NavigationButtons from "../../components/NavigationButtons";

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
    </div>
  );
}
