import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, List as ListIcon } from "lucide-react";

function SidebarItem({ icon: Icon, label, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors ${
        active
          ? "bg-[#111111] text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ className = "", isMobile = false }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside
      className={`w-64 border-r border-gray-200 bg-white flex flex-col h-[calc(100vh-4rem)] sticky top-16 shrink-0 ${className}`}
    >
      {isMobile && (
        <div className="p-4 border-b border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-[#111111] text-white rounded flex items-center justify-center font-bold text-lg leading-none">
              R
            </div>
            <span className="font-semibold text-[17px] text-gray-900 tracking-tight">
              Resuave Editor
            </span>
          </Link>
        </div>
      )}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        <SidebarItem
          icon={Download}
          label="Installation"
          to="/installation"
          active={path === "/installation"}
        />
        <SidebarItem
          icon={ListIcon}
          label="Props"
          to="/props"
          active={path === "/props"}
        />
      </nav>

      <div className="p-4 border-t border-gray-100 flex flex-col gap-3 text-sm text-gray-600">
        <div className="text-gray-400 mt-2">Resuave Editor v0.1.0</div>
      </div>
    </aside>
  );
}
