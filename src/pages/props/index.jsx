import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CORE_PROPS, OPTIONAL_PROPS } from "@/data/props-data";
import CodePreview from "@/components/CodePreview";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PropsPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [hash]);

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
              <Table className="w-full text-left text-sm">
                <TableHeader className="bg-gray-50 border-b border-gray-100">
                  <TableRow>
                    <TableHead className="px-4 py-3 font-semibold text-gray-900">
                      Prop
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-900">
                      Type
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-900">
                      Default
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-900">
                      Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-50">
                  {CORE_PROPS.map((prop, idx) => (
                    <TableRow
                      key={idx}
                      id={prop.prop}
                      className="scroll-mt-[50px]"
                    >
                      <TableCell className="px-4 py-3 font-mono text-xs text-gray-800">
                        {prop.prop}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 font-mono text-[11px] whitespace-nowrap">
                        {prop.type}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-mono text-xs text-gray-500">
                        {prop.default}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600">
                        {prop.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Optional Props Table */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              2. Optional props
            </h3>
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <Table className="w-full text-left text-sm">
                <TableHeader className="bg-gray-50 border-b border-gray-100">
                  <TableRow>
                    <TableHead className="px-4 py-3 font-semibold text-gray-900">
                      Prop
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-900">
                      Type
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-900">
                      Default
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-900">
                      Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-50">
                  {OPTIONAL_PROPS.map((prop, idx) => (
                    <TableRow
                      key={idx}
                      id={prop.prop}
                      className="scroll-mt-[50px]"
                    >
                      <TableCell className="px-4 py-3 font-mono text-xs text-gray-800">
                        {prop.prop}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 font-mono text-[11px] whitespace-nowrap">
                        {prop.type}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-mono text-xs text-gray-500">
                        {prop.default}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600">
                        {prop.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Step 3: Controlled Example */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              3. Controlled example
            </h3>
            <CodePreview
              code={`import { useState } from 'react'
import { ResuaveEditor } from '@resuave/tiptap-editor'

export default function App() {
  const [ value, setValue ] = useState('<p>Hello, Resuave!</p>')

  return (
    <ResuaveEditor value={value} onChange={setValue} />
  )
}`}
              language="jsx"
              theme="dark"
            />
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
