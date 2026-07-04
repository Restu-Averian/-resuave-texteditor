import React from "react";
import { Zap, Puzzle, Accessibility, Shield } from "lucide-react";

export default function BottomBadges() {
  return (
    <section className="flex flex-wrap items-center justify-between lg:justify-center gap-12 lg:gap-24 pt-8 pb-16 border-t border-gray-200/60 mt-4">
      <div className="flex items-center gap-4">
        <Zap size={24} strokeWidth={1.5} className="text-gray-800" />
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-gray-900">
            Lightweight
          </span>
          <span className="text-sm text-gray-500">Minimal footprint</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Puzzle size={24} strokeWidth={1.5} className="text-gray-800" />
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-gray-900">
            Extensible
          </span>
          <span className="text-sm text-gray-500">Built on Tiptap</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Accessibility
          size={24}
          strokeWidth={1.5}
          className="text-gray-800"
        />
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-gray-900">
            Accessible
          </span>
          <span className="text-sm text-gray-500">WCAG friendly</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Shield size={24} strokeWidth={1.5} className="text-gray-800" />
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-gray-900">
            Secure
          </span>
          <span className="text-sm text-gray-500">
            No unnecessary bloat
          </span>
        </div>
      </div>
    </section>
  );
}
