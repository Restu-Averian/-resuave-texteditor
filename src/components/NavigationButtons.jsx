import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NavigationButtons({ prev, next, className = "mt-4" }) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {prev ? (
        <Link
          to={prev.path}
          className="border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-gray-300 transition-colors bg-white group"
        >
          <ArrowLeft
            size={20}
            className="text-gray-400 group-hover:-translate-x-1 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">{prev.label || "Previous"}</span>
            <span className="font-semibold text-gray-900">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.path}
          target={next.external ? "_blank" : undefined}
          className="border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors bg-white group"
        >
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">{next.label || "Next"}</span>
            <span className="font-semibold text-gray-900">{next.title}</span>
          </div>
          <ArrowRight
            size={20}
            className="text-gray-400 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
