import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import ShikiHighlighter from "react-shiki";
import { cn } from "../lib/utils";

export default function CodePreview({
  code,
  language = "bash",
  theme = "dark",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === "dark";
  const containerClass = cn(
    "rounded-lg p-4 relative group overflow-hidden",
    isDark ? "bg-[#111111]" : "bg-[#fafafa] border border-gray-200",
  );

  const btnClass = cn(
    "cursor-pointer text-gray-400 transition-colors z-10 p-1 rounded absolute top-4 right-4 opacity-0 group-hover:opacity-100",
    isDark
      ? "hover:text-white bg-[#111111]"
      : "hover:text-gray-700 bg-[#fafafa]",
  );

  const preClass = cn(
    "text-sm font-mono leading-relaxed overflow-x-auto overflow-y-hidden",
    "[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0",
    "[&_code]:!bg-transparent [&_code]:!m-0 [&_code]:!p-0",
  );

  return (
    <div className={containerClass}>
      <button onClick={handleCopy} className={btnClass} title="Copy code">
        {copied ? (
          <Check
            size={16}
            className={isDark ? "text-green-400" : "text-green-600"}
          />
        ) : (
          <Copy size={16} />
        )}
      </button>
      <div className={preClass}>
        <ShikiHighlighter
          language={language}
          theme={isDark ? "github-dark" : "github-light"}
          addDefaultStyles={false}
        >
          {code}
        </ShikiHighlighter>
      </div>
    </div>
  );
}
