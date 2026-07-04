import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CodePreview from "../../components/CodePreview";

export default function InstallationPage() {
  const [pkgManager, setPkgManager] = useState("npm");

  return (
    <div className="flex-1 overflow-y-auto p-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            {/* Header Area */}
            <div className="flex flex-col gap-4">
              {/* Breadcrumb */}
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>Docs</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-medium">Installation</span>
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
                  Installation
                </h1>
                <p className="text-lg text-gray-600">
                  Install Resuave Editor in your React app.
                </p>
              </div>
            </div>

            {/* Package Manager Toggle */}
            <div className="inline-flex p-1 bg-white border border-gray-200 rounded-lg w-fit">
              {["npm", "pnpm", "yarn", "bun"].map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPkgManager(pm)}
                  className={`px-10 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    pkgManager === pm
                      ? "bg-[#111111] text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>

            {/* Steps Container */}
            <div className="flex flex-col gap-6">
              {/* Step 1 */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
                <h3 className="font-semibold text-gray-900 text-sm">
                  1. Install package
                </h3>
                <CodePreview code={`${pkgManager} ${pkgManager === "yarn" ? "add" : "install"} @resuave/tiptap-editor`} />
              </div>

              {/* Step 2 */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
                <h3 className="font-semibold text-gray-900 text-sm">
                  2. Install peer dependencies
                </h3>
                <CodePreview code={`${pkgManager} ${pkgManager === "yarn" ? "add" : "install"} react react-dom @tiptap/react @tiptap/pm @tiptap/starter-kit`} />
              </div>

              {/* Step 3 */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
                <h3 className="font-semibold text-gray-900 text-sm">
                  3. Quick usage
                </h3>
                <CodePreview 
                  language="jsx"
                  code={`import { ResuaveEditor } from '@resuave/tiptap-editor'
import '@resuave/tiptap-editor/style.css'

export default function App() {
  return (
    <ResuaveEditor content="Hello, Resuave!" onChange={(c) => console.log(c)} />
  )
}`}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <a
                href="#"
                className="border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-gray-300 transition-colors bg-white group"
              >
                <ArrowLeft
                  size={20}
                  className="text-gray-400 group-hover:-translate-x-1 transition-transform"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Previously</span>
                  <span className="font-semibold text-gray-900">Overview</span>
                </div>
              </a>
              <a
                href="#"
                className="border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors bg-white group"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Next up</span>
                  <span className="font-semibold text-gray-900">Usage</span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-gray-400 group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
  );
}
