import React from "react";
import { ExternalLink } from "lucide-react";
import SearchCommand from "../components/SearchCommand";

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
      <SearchCommand />
    </header>
  );
}
