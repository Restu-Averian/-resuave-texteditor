import React, { useState } from "react";
import CodePreview from "../../components/CodePreview";
import NavigationButtons from "../../components/NavigationButtons";

export default function InstallationPage() {
  const [pkgManager, setPkgManager] = useState("npm");

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 md:gap-10">
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
              Install ResuAve TextEditor in your React app.
            </p>
          </div>
        </div>

        {/* Package Manager Toggle */}
        <div className="inline-flex p-1 bg-white border border-gray-200 rounded-lg w-fit overflow-x-auto max-w-full">
          {["npm", "pnpm", "yarn", "bun"].map((pm) => (
            <button
              key={pm}
              onClick={() => setPkgManager(pm)}
              className={`cursor-pointer px-6 sm:px-10 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                pkgManager === pm
                  ? "bg-[#111111] text-white shadow-sm"
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
            <CodePreview
              code={`${pkgManager} ${pkgManager === "yarn" ? "add" : "install"} @resuave/texteditor`}
            />
          </div>

          {/* Step 2 */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              2. Install peer dependencies
            </h3>
            <CodePreview
              code={`${pkgManager} ${pkgManager === "yarn" ? "add" : "install"} react react-dom`}
            />
          </div>

          {/* Step 3 */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              3. Quick usage
            </h3>
            <CodePreview
              language="jsx"
              code={`import { ResuAveTextEditor } from '@resuave/texteditor'
import '@resuave/texteditor/style.css'

export default function App() {
  return (
    <ResuAveTextEditor content="This is your first content." onChange={(c) => console.log(c)} />
  )
}`}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          next={{ path: "/props", label: "Next up", title: "Props" }}
        />
      </div>
    </div>
  );
}
