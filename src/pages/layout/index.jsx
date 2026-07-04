import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
