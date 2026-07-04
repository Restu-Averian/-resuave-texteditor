import React from "react";
import {
  List as ListIcon,
  Bold,
  AlignLeft,
  Link as LinkIcon,
  Smartphone,
  Zap,
  ExternalLink,
} from "lucide-react";
import CodePreview from "../../components/CodePreview";
import Texteditor from "../../Texteditor";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3 bg-white">
      <Icon size={24} className="text-gray-700" />
      <div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Navbar />

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-12">
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            {/* Hero Section */}
            <section className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1 pt-8 flex flex-col gap-6">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                  Build rich text editing faster.
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Resuave Editor is a reusable Tiptap editor component for React
                  applications.
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="bg-[#111111] hover:bg-black text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm">
                    Get Started
                  </button>
                  <a
                    href="https://github.com/Restu-Averian/-resuave-texteditor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
                  >
                    View on GitHub <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-2">
                <Texteditor
                  value="<p>This is ResuAve Editor</p>"
                  onChange={() => {}}
                />
              </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <FeatureCard
                icon={Bold}
                title="Text Formatting"
                description="Bold, italic, underline, strike, and more."
              />
              <FeatureCard
                icon={ListIcon}
                title="Lists"
                description="Bulleted, numbered, and checklist support."
              />
              <FeatureCard
                icon={AlignLeft}
                title="Alignment"
                description="Left, center, right, and justify."
              />
              <FeatureCard
                icon={LinkIcon}
                title="Link Support"
                description="Add and edit links with ease."
              />
              <FeatureCard
                icon={Smartphone}
                title="Mobile Mode"
                description="Optimized editing experience on mobile."
              />
              <FeatureCard
                icon={Zap}
                title="Easy Setup"
                description="Drop in and start building instantly."
              />
            </section>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Installation</h3>
                  <CodePreview
                    code="npm install @resuave/tiptap-editor"
                    theme="light"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Usage / Quick Start
                  </h3>
                  <CodePreview
                    language="jsx"
                    theme="light"
                    code={`import { ResuaveEditor } from "@resuave/tiptap-editor";

function App() {
  return (
    <ResuaveEditor
      placeholder="Start writing..."
      onChange={(html) => console.log(html)}
    />
  );
}`}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Props (Preview)
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
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
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs">value</td>
                          <td className="px-4 py-3 text-gray-600">string</td>
                          <td className="px-4 py-3 text-gray-400">-</td>
                          <td className="px-4 py-3 text-gray-600">
                            Controlled HTML value.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs">
                            defaultValue
                          </td>
                          <td className="px-4 py-3 text-gray-600">string</td>
                          <td className="px-4 py-3 font-mono text-gray-400 text-xs">
                            ""
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            Initial HTML content.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs">
                            onChange
                          </td>
                          <td className="px-4 py-3 text-gray-600 font-mono text-[11px] whitespace-nowrap">
                            (html: string) =&gt; void
                          </td>
                          <td className="px-4 py-3 text-gray-400">-</td>
                          <td className="px-4 py-3 text-gray-600">
                            Fires when content changes.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs">
                            placeholder
                          </td>
                          <td className="px-4 py-3 text-gray-600">string</td>
                          <td className="px-4 py-3 font-mono text-gray-400 text-xs">
                            ""
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            Placeholder text.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs">
                            disabled
                          </td>
                          <td className="px-4 py-3 text-gray-600">boolean</td>
                          <td className="px-4 py-3 font-mono text-gray-600 text-xs">
                            false
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            Disables the editor.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs">
                            readOnly
                          </td>
                          <td className="px-4 py-3 text-gray-600">boolean</td>
                          <td className="px-4 py-3 font-mono text-gray-600 text-xs">
                            false
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            Set editor to read-only.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
