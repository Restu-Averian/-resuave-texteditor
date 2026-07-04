import React from "react";
import { Link } from "react-router-dom";
import { Copy, ArrowLeft, ArrowRight } from "lucide-react";
import { CORE_PROPS, OPTIONAL_PROPS } from "@/data/props-data";

export default function PropsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Header Area */}
        <div className="flex flex-col gap-4">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Docs</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Props</span>
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Props
            </h1>
            <p className="text-lg text-gray-600">
              Learn the available props for Resuave Editor.
            </p>
          </div>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col gap-6">
          {/* Core Props Table */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              1. Core props
            </h3>
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Prop
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Default
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {CORE_PROPS.map((prop, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-mono text-xs text-gray-800">
                        {prop.prop}
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-[11px] whitespace-nowrap">
                        {prop.type}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">
                        {prop.default}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Optional Props Table */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              2. Optional props
            </h3>
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Prop
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Default
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {OPTIONAL_PROPS.map((prop, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-mono text-xs text-gray-800">
                        {prop.prop}
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-[11px] whitespace-nowrap">
                        {prop.type}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">
                        {prop.default}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step 3: Controlled Example */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              3. Controlled example
            </h3>
            <div className="bg-[#111111] rounded-lg p-4 overflow-x-auto relative group">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <Copy size={16} />
              </button>
              <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                <span className="text-gray-500 select-none mr-4">1</span>
                <span className="text-pink-400">import</span> {"{"}{" "}
                <span className="text-blue-300">useState</span> {"}"}{" "}
                <span className="text-pink-400">from</span>{" "}
                <span className="text-green-400">'react'</span>
                <br />
                <span className="text-gray-500 select-none mr-4">2</span>
                <span className="text-pink-400">import</span> {"{"}{" "}
                <span className="text-blue-300">ResuaveEditor</span> {"}"}{" "}
                <span className="text-pink-400">from</span>{" "}
                <span className="text-green-400">'@resuave/tiptap-editor'</span>
                <br />
                <span className="text-gray-500 select-none mr-4">3</span>
                <br />
                <span className="text-gray-500 select-none mr-4">4</span>
                <span className="text-pink-400">
                  export default function
                </span>{" "}
                <span className="text-blue-400">App</span>() {"{"}
                <br />
                <span className="text-gray-500 select-none mr-4">5</span>
                {"  "}
                <span className="text-pink-400">const</span> [{" "}
                <span className="text-blue-300">value</span>,{" "}
                <span className="text-blue-300">setValue</span> ] ={" "}
                <span className="text-blue-400">useState</span>(
                <span className="text-green-400">
                  '&lt;p&gt;Hello, Resuave!&lt;/p&gt;'
                </span>
                )
                <br />
                <span className="text-gray-500 select-none mr-4">6</span>
                <br />
                <span className="text-gray-500 select-none mr-4">7</span>
                {"  "}
                <span className="text-pink-400">return</span> (
                <br />
                <span className="text-gray-500 select-none mr-4">8</span>
                {"    "}
                <span className="text-blue-400">&lt;ResuaveEditor</span>{" "}
                <span className="text-purple-300">content</span>={"{"}
                <span className="text-orange-300">value</span>
                {"}"} <span className="text-purple-300">onChange</span>={"{"}
                <span className="text-blue-300">setValue</span>
                {"}"} <span className="text-blue-400">/&gt;</span>
                <br />
                <span className="text-gray-500 select-none mr-4">9</span>
                {"  "})
                <br />
                <span className="text-gray-500 select-none mr-4">10</span>
                {"}"}
              </pre>
            </div>
          </div>

          {/* Step 4: Notes */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              4. Props notes
            </h3>
            <ul className="list-disc list-outside ml-5 text-sm text-gray-700 flex flex-col gap-1">
              <li>Use controlled mode when syncing with form state.</li>
              <li>Use readOnly for content preview.</li>
              <li>Disable the editor during async actions if needed.</li>
              <li>Keep placeholder short and descriptive.</li>
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Link
            to="/"
            className="border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-gray-300 transition-colors bg-white group"
          >
            <ArrowLeft
              size={20}
              className="text-gray-400 group-hover:-translate-x-1 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Previously</span>
              <span className="font-semibold text-gray-900">Features</span>
            </div>
          </Link>
          <Link
            to="#"
            className="border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors bg-white group"
          >
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Next up</span>
              <span className="font-semibold text-gray-900">Mobile Mode</span>
            </div>
            <ArrowRight
              size={20}
              className="text-gray-400 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
