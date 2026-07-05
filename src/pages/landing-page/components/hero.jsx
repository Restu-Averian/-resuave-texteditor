import React from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import Texteditor from "../../../Texteditor";

export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row gap-16 items-center">
      <div className="flex-1 flex flex-col gap-6 items-start">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 shadow-sm">
          <Zap size={14} /> Fast • Flexible • Reusable
        </div>
        <h1 className="text-[3.5rem] leading-[1.1] font-bold tracking-tight text-gray-900 mt-2">
          Build rich text editing faster.
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-[480px]">
          ResuAve TextEditor is a reusable Tiptap editor component for React
          applications. Lightweight, feature-rich, and easy to integrate.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Link
            to="/installation"
            className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="flex-1 w-full bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-2">
          <Texteditor
            value="<h2>Your content, beautifully crafted.</h2><p>ResuAve TextEditor gives you the tools to create, format, and organize content effortlessly.</p><ul><li>Lightweight and fast</li><li>Modern and accessible</li><li>Built with developers in mind</li></ul>"
            onChange={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
