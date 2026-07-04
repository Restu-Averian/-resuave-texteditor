import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Download, List as ListIcon } from "lucide-react";

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

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center font-semibold text-lg">
          R
        </div>
        <span className="font-semibold text-lg">Resuave Editor</span>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-1">
        <SidebarItem
          icon={Home}
          label="Overview"
          to="/"
          active={path === "/"}
        />
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
