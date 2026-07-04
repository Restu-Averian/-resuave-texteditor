import React from "react";
import { Search, ExternalLink } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-end px-8 gap-6 text-sm font-medium text-gray-600 sticky top-0 z-10">
      <a href="#" className="hover:text-gray-900">
        Docs
      </a>
      <a
        href="https://github.com/Restu-Averian/-resuave-texteditor"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-gray-900"
      >
        GitHub <ExternalLink size={14} />
      </a>
      <a href="#" className="flex items-center gap-1 hover:text-gray-900">
        NPM <ExternalLink size={14} />
      </a>
      <div className="relative flex items-center">
        <Search size={14} className="absolute left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="pl-9 pr-12 py-1.5 bg-gray-100 border border-transparent rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white w-64 transition-all"
        />
        <div className="absolute right-2 border border-gray-200 rounded px-1.5 py-0.5 text-[10px] text-gray-400 font-mono bg-white">
          ⌘K
        </div>
      </div>
    </header>
  );
}
