import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Home,
  Download,
  List,
  Bold,
  ListOrdered,
  AlignLeft,
  Link as LinkIcon,
  Zap,
  Code2,
  CheckSquare,
  Rocket,
  GitBranch as Github,
  Package,
  ArrowUpRight,
} from "lucide-react";
import { Fzf } from "fzf";

const SEARCH_DATA = [
  {
    category: "PAGES",
    items: [
      {
        id: "overview",
        title: "Overview",
        description: "Introduction to Resuave Editor and key highlights",
        icon: Home,
        type: "page",
        url: "/",
        shortcut: "⌘1",
      },
      {
        id: "installation",
        title: "Installation",
        description: "Install Resuave Editor in your React app",
        icon: Download,
        type: "page",
        url: "/installation",
        shortcut: "⌘2",
      },
      {
        id: "props",
        title: "Props",
        description: "Learn the available props for Resuave Editor",
        icon: List,
        type: "page",
        url: "/props",
        shortcut: "⌘3",
      },
    ],
  },
  {
    category: "LANDING SECTIONS / HIGHLIGHTS",
    items: [
      {
        id: "text-formatting",
        title: "Text Formatting",
        description: "Rich text styling: bold, italic, underline, and more",
        icon: Bold,
        type: "page",
        url: "/#text-formatting",
        shortcut: "⌘4",
      },
      {
        id: "lists",
        title: "Lists",
        description: "Bulleted, numbered, and checklist support",
        icon: ListOrdered,
        type: "page",
        url: "/#lists",
        shortcut: "⌘5",
      },
      {
        id: "alignment",
        title: "Alignment",
        description: "Left, center, right, and justify content",
        icon: AlignLeft,
        type: "page",
        url: "/#alignment",
        shortcut: "⌘6",
      },
      {
        id: "link-support",
        title: "Link Support",
        description: "Add and edit links with ease",
        icon: LinkIcon,
        type: "page",
        url: "/#link-support",
        shortcut: "⌘7",
      },
      {
        id: "easy-setup",
        title: "Easy Setup",
        description: "Drop in and start building instantly",
        icon: Zap,
        type: "page",
        url: "/#easy-setup",
        shortcut: "⌘8",
      },
      {
        id: "quick-start",
        title: "Quick Start",
        description: "Get up and running in minutes",
        icon: Code2,
        type: "page",
        url: "/#quick-start",
        shortcut: "⌘9",
      },
      {
        id: "installation-guide",
        title: "Installation",
        description: "Installation guide and peer dependencies",
        icon: Download,
        type: "page",
        url: "/installation",
        shortcut: "⇧ ⌘ 1",
      },
      {
        id: "props-preview",
        title: "Props Preview",
        description: "Browse all props in the live preview",
        icon: List,
        type: "page",
        url: "/props",
        shortcut: "⇧ ⌘ 2",
      },
    ],
  },
  {
    category: "PROPS ENTRIES",
    items: [
      {
        id: "prop-value",
        title: "value",
        description: "Initial HTML content",
        icon: "abc",
        type: "page",
        url: "/props#value",
        shortcut: "p v",
      },
      {
        id: "prop-onchange",
        title: "onChange",
        description: "Fires when content changes",
        icon: "{x}",
        type: "page",
        url: "/props#onchange",
        shortcut: "p c",
      },
      {
        id: "prop-placeholder",
        title: "placeholder",
        description: "Placeholder text",
        icon: "abc",
        type: "page",
        url: "/props#placeholder",
        shortcut: "p p",
      },
      {
        id: "prop-readonly",
        title: "readOnly",
        description: "Makes editor non-editable",
        icon: CheckSquare,
        type: "page",
        url: "/props#readonly",
        shortcut: "p r",
      },
    ],
  },
  {
    category: "OTHER",
    items: [
      {
        id: "get-started",
        title: "Get Started",
        description: "Jump to the quick start guide",
        icon: Rocket,
        type: "link",
        url: "/installation",
      },
      {
        id: "github",
        title: "View on GitHub",
        description: "Open the repository",
        icon: Github,
        type: "link",
        url: "https://github.com/Restu-Averian/-resuave-texteditor",
      },
      {
        id: "npm",
        title: "NPM Package",
        description: "View on npmjs.com",
        icon: Package,
        type: "link",
        url: "https://www.npmjs.com",
      },
    ],
  },
];

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(true);

  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      queueMicrotask(() => {
        setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
      });
    }

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const flatItems = useMemo(() => {
    const allItems = SEARCH_DATA.flatMap((c) => c.items);
    if (!query) return allItems;

    const fzf = new Fzf(allItems, {
      selector: (item) => `${item.title} ${item.description || ""}`,
    });

    const matchedIds = new Set(fzf.find(query).map((res) => res.item.id));
    return allItems.filter((item) => matchedIds.has(item.id));
  }, [query]);

  useEffect(() => {
    queueMicrotask(() => {
      setSelectedIndex(0);
    });
  }, [query, open]);

  // Scroll into view logic
  useEffect(() => {
    if (open && listRef.current) {
      const selectedEl = listRef.current.querySelector(
        '[data-selected="true"]',
      );
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex, open]);

  const handleSelect = (item) => {
    if (!item) return;
    try {
      if (item.type === "link" || item.url.startsWith("http")) {
        window.open(item.url, "_blank", "noopener,noreferrer");
      } else {
        navigate(item.url);
      }
      setOpen(false);
      setQuery("");
    } catch (e) {
      console.error("Navigation error", e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + flatItems.length) % flatItems.length,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(flatItems[selectedIndex]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="relative flex items-center cursor-text group"
          onClick={() => setOpen(true)}
        >
          <Search
            size={14}
            className="absolute left-3 text-gray-400 group-hover:text-gray-600 transition-colors"
          />
          <div className="pl-9 pr-12 py-1.5 bg-gray-100 border border-transparent rounded-md text-sm text-gray-400 w-64 flex items-center group-hover:bg-gray-200/80 transition-all">
            Search
          </div>
          <div className="absolute right-2 border border-gray-200 rounded px-1.5 py-0.5 text-[10px] text-gray-400 font-mono bg-white">
            {isMac ? "⌘K" : "Ctrl+K"}
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[640px] p-0 shadow-2xl rounded-xl border border-gray-200 flex flex-col bg-white overflow-hidden"
      >
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <Search size={16} className="text-gray-400 mr-3 shrink-0" />
          <input
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-400 text-gray-900"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="mr-3 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
          <div className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 font-mono text-gray-400 bg-gray-50">
            esc
          </div>
        </div>

        <div
          ref={listRef}
          className="max-h-[420px] overflow-y-auto p-2 scroll-smooth"
        >
          {SEARCH_DATA.map((group, gIdx) => {
            const groupItems = query
              ? group.items.filter((item) =>
                  flatItems.some((f) => f.id === item.id),
                )
              : group.items;

            if (groupItems.length === 0) return null;

            return (
              <div key={gIdx} className="mb-4 last:mb-0">
                <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  {group.category}
                </div>
                {groupItems.map((item) => {
                  const globalIndex = flatItems.findIndex(
                    (i) => i.id === item.id,
                  );
                  const isSelected = selectedIndex === globalIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      data-selected={isSelected}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-500">
                          {typeof item.icon === "string" ? (
                            <span className="font-mono text-[10.5px] font-bold">
                              {item.icon}
                            </span>
                          ) : (
                            <item.icon size={15} />
                          )}
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[13px] font-medium text-gray-900 shrink-0">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="text-[12px] text-gray-400 truncate">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        {item.type === "link" ? (
                          <ArrowUpRight size={14} className="text-gray-400" />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {flatItems.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-500">
              No results found for "{query}".
            </div>
          )}

          {!query && (
            <div className="mb-2 mt-4 border-t border-gray-100 pt-4">
              <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                RECENT
              </div>
              <div className="px-3 flex flex-wrap gap-2">
                <div
                  onClick={() => handleSelect(SEARCH_DATA[0].items[2])}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-md text-[11px] text-gray-600 font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Props
                </div>
                <div
                  onClick={() => handleSelect(SEARCH_DATA[0].items[1])}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-md text-[11px] text-gray-600 font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Installation
                </div>
                <div
                  onClick={() => handleSelect(SEARCH_DATA[1].items[0])}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-md text-[11px] text-gray-600 font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Text Formatting
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-4 ml-auto">
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] border border-gray-200 rounded px-1 bg-white">
                ↑
              </span>
              <span className="font-mono text-[10px] border border-gray-200 rounded px-1 bg-white">
                ↓
              </span>
              to navigate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] border border-gray-200 rounded px-1 bg-white">
                ↵
              </span>
              to select
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] border border-gray-200 rounded px-1 bg-white">
                esc
              </span>
              to close
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
