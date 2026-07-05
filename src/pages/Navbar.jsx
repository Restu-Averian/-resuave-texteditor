import React, { useState, useEffect } from "react";
import { ExternalLink, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SearchCommand from "../components/SearchCommand";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    queueMicrotask(() => {
      setIsOpen(false);
    });
  }, [location.pathname]);

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <button className="p-1.5 -ml-1.5 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100 transition-colors">
                <Menu size={22} strokeWidth={2} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="w-64 rounded-none border-r outline-none p-0 bg-white">
              <div className="sr-only">
                <DrawerTitle>Navigation Menu</DrawerTitle>
                <DrawerDescription>Mobile navigation links</DrawerDescription>
              </div>
              <Sidebar className="w-full border-none h-full" isMobile />
            </DrawerContent>
          </Drawer>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-[#111111] text-white rounded flex items-center justify-center font-bold text-lg leading-none">
            R
          </div>
          <span className="font-semibold text-[17px] text-gray-900 tracking-tight hidden sm:block">
            Resuave Editor
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-6 text-sm font-medium text-gray-600">
        <a
          href="https://github.com/Restu-Averian/-resuave-texteditor"
          target="_blank"
          rel="noopener noreferrer"
          className="items-center gap-1.5 hover:text-gray-900 hidden sm:flex transition-colors"
        >
          GitHub <ExternalLink size={14} />
        </a>
        <a
          href="https://www.npmjs.com/package/@resuave/texteditor"
          target="_blank"
          rel="noopener noreferrer"
          className="items-center gap-1.5 hover:text-gray-900 hidden sm:flex transition-colors"
        >
          NPM <ExternalLink size={14} />
        </a>
        <div className="ml-1 md:ml-2">
          <SearchCommand />
        </div>
      </div>
    </header>
  );
}
