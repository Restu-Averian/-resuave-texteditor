import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-gray-900">
      <Navbar />
      <div className="flex-1 flex w-full">
        <Sidebar className="hidden md:flex" />
        <main className="flex-1 flex flex-col min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
