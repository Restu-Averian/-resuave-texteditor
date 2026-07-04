import React from "react";
import CodePreview from "../../../components/CodePreview";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

export default function PreviewCode() {
  return (
    <div className="lg:col-span-7 flex flex-col">
      <Tabs
        defaultValue="installation"
        className="bg-[#1e1e24] rounded-xl overflow-hidden shadow-xl flex flex-col h-full border border-gray-800"
      >
        <div className="px-6 pt-4 border-b border-gray-800">
          <TabsList variant="line" className="h-auto p-0 gap-6">
            <TabsTrigger
              value="installation"
              className="cursor-pointer text-gray-400 hover:text-gray-200 data-[state=active]:text-white text-sm font-medium pb-4 border-b-2 border-transparent  transition-colors rounded-none px-0 bg-transparent! shadow-none! outline-none after:hidden"
            >
              Installation
            </TabsTrigger>
            <TabsTrigger
              value="quick-start"
              className="cursor-pointer text-gray-400 hover:text-gray-200 data-[state=active]:text-white text-sm font-medium pb-4 border-b-2 border-transparent  transition-colors rounded-none px-0 bg-transparent! shadow-none! outline-none after:hidden"
            >
              Quick Start
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="p-6 flex flex-col gap-6 flex-1 bg-[#1a1b20]">
          <TabsContent value="installation" className="mt-0 outline-none">
            <CodePreview
              code="npm install @resuave/tiptap-editor"
              language="bash"
              theme="dark"
            />
          </TabsContent>
          <TabsContent value="quick-start" className="mt-0 outline-none">
            <CodePreview
              code={`import { ResuaveEditor } from "@resuave/tiptap-editor";\nfunction App() {\n  return (\n    <ResuaveEditor\n      placeholder="Start writing..."\n      onChange={(html) => console.log(html)}\n    />\n  );\n}`}
              language="jsx"
              theme="dark"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
