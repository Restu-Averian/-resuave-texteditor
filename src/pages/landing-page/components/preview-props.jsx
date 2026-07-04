import React from "react";
import { Link } from "react-router-dom";
import { CORE_PROPS } from "../../../data/props-data";

export default function PreviewProps() {
  return (
    <div className="lg:col-span-5 flex flex-col h-full">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-gray-900">
            Props (API Preview)
          </h3>
          <Link
            to="/props"
            className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            View all props &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-900 text-xs">
                  Prop
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900 text-xs">
                  Type
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900 text-xs">
                  Default
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900 text-xs">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CORE_PROPS.map((prop, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-3.5 font-mono text-xs text-gray-800">
                    {prop.prop}
                  </td>
                  <td className="px-6 py-3.5 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                    {prop.type}
                  </td>
                  <td className="px-6 py-3.5 text-gray-400 font-mono text-xs">
                    {prop.default}
                  </td>
                  <td className="px-6 py-3.5 text-gray-500 text-xs">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
