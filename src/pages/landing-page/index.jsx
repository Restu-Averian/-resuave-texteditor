import React from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Menu,
  FileText,
  GitBranch as Github,
  Package,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
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
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 outline-none flex items-center justify-center">
                <Menu size={20} className="text-gray-900" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 p-2 rounded-xl mt-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white border border-gray-100"
              >
                <DropdownMenuItem className="p-0 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50 outline-none">
                  <Link
                    to="/installation"
                    className="flex items-center gap-3 w-full px-3 py-2.5"
                  >
                    <FileText
                      size={16}
                      strokeWidth={2}
                      className="text-gray-700"
                    />
                    <span className="font-medium text-gray-900 text-[15px]">
                      Docs
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-gray-100" />

                <DropdownMenuItem className="p-0 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50 outline-none">
                  <a
                    href="https://github.com/Restu-Averian/-resuave-texteditor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-3 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <Github
                        size={16}
                        strokeWidth={2}
                        className="text-gray-700"
                      />
                      <span className="font-medium text-gray-900 text-[15px]">
                        GitHub
                      </span>
                    </div>
                    <ExternalLink size={14} className="text-gray-400" />
                  </a>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-gray-100" />

                <DropdownMenuItem className="p-0 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50 outline-none">
                  <a
                    href="#"
                    className="flex items-center justify-between w-full px-3 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <Package
                        size={16}
                        strokeWidth={2}
                        className="text-gray-700"
                      />
                      <span className="font-medium text-gray-900 text-[15px]">
                        NPM
                      </span>
                    </div>
                    <ExternalLink size={14} className="text-gray-400" />
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
