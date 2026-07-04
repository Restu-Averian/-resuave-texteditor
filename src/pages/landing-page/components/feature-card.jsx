import React from "react";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4 bg-white hover:border-gray-300 transition-colors shadow-sm">
      <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
        <Icon size={20} className="text-gray-700" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-[15px] mb-1.5">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
