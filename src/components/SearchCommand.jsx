import { useState, useEffect, useMemo, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle as DrawerTitleUI,
  DrawerDescription as DrawerDescUI,
} from "@/components/ui/drawer";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Search,
  X,
  Home,
  Download,
  List,
  GitBranch as Github,
  Package,
  ArrowUpRight,
} from "lucide-react";
import { Fzf } from "fzf";
import { CORE_PROPS, OPTIONAL_PROPS } from "@/data/props-data";

const SEARCH_DATA = [
  {
    category: "PAGES",
    items: [
      {
        id: "overview",
        title: "Overview",
        description: "Introduction to ResuAve TextEditor and key highlights",
        icon: Home,
        type: "page",
        url: "/",
      },
      {
        id: "installation",
        title: "Installation",
        description: "Install ResuAve TextEditor in your React app",
        icon: Download,
        type: "page",
        url: "/installation",
      },
      {
        id: "props",
        title: "Props",
        description: "Learn the available props for ResuAve TextEditor",
        icon: List,
        type: "page",
        url: "/props",
      },
    ],
  },

  {
    category: "PROPS ENTRIES",
    items: [
      ...CORE_PROPS.map((p) => ({
        id: `prop-${p.prop}`,
        title: p.prop,
        description: p.description,
        icon: p.type.includes("=>") ? "{x}" : "abc",
        type: "page",
        url: `/props#${p.prop}`,
      })),
      ...OPTIONAL_PROPS.map((p) => ({
        id: `prop-${p.prop}`,
        title: p.prop,
        description: p.description,
        icon: p.type.includes("=>") ? "{x}" : "abc",
        type: "page",
        url: `/props#${p.prop}`,
      })),
    ],
  },
  {
    category: "OTHER",
    items: [
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
        url: "https://www.npmjs.com/package/@resuave/texteditor",
      },
    ],
  },
];

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  const trigger = (
    <div
      className="relative flex items-center cursor-text group"
      onClick={() => setOpen(true)}
    >
      <Search
        size={14}
        className="absolute left-3 text-gray-400 group-hover:text-gray-600 transition-colors"
      />
      <div className="pl-9 pr-12 py-1.5 bg-gray-100 border border-transparent rounded-md text-sm text-gray-400 w-[160px] md:w-64 flex items-center group-hover:bg-gray-200/80 transition-all">
        Search
      </div>
      <div className="absolute right-2 border border-gray-200 rounded px-1.5 py-0.5 text-[10px] text-gray-400 font-mono bg-white hidden sm:block">
        {isMac ? "⌘K" : "Ctrl+K"}
      </div>
    </div>
  );

  const innerContent = (
    <>
      <div className="px-5 pb-5 pt-3 md:pt-5">
        <div className="flex items-center px-4 py-3.5 border border-gray-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-gray-200 transition-shadow">
          <Search size={18} className="text-gray-400 mr-3 shrink-0" />
          <input
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-400 text-gray-900"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={isDesktop}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="mr-3 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
          <div className="text-[10px] border border-gray-200 rounded-md px-2 py-0.5 font-mono text-gray-400 bg-white ml-2">
            esc
          </div>
        </div>
      </div>

      <div
        ref={listRef}
        className="max-h-[50vh] sm:max-h-[420px] overflow-y-auto px-2 pb-2 scroll-smooth"
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
              <div className="px-4 py-2 text-[11px] font-bold tracking-[0.08em] text-slate-400 uppercase">
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
                    className={`flex items-center justify-between mx-2 px-4 py-3.5 rounded-xl cursor-pointer transition-colors ${
                      isSelected ? "bg-gray-100" : "hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-500">
                        {typeof item.icon === "string" ? (
                          <span className="font-mono text-[11px] font-bold tracking-tight">
                            {item.icon}
                          </span>
                        ) : (
                          <item.icon size={18} strokeWidth={1.5} />
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 truncate">
                        <span className="text-[14px] font-medium text-gray-900 shrink-0">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="text-[13px] text-gray-400 truncate">
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
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-center sm:justify-between text-[11px] text-gray-500 md:rounded-b-3xl">
        <div className="flex items-center gap-6 mx-auto sm:mx-0">
          <span className="flex items-center gap-2">
            <span className="font-mono text-[10px] border border-gray-200 rounded-md px-1.5 py-0.5 bg-white">
              ↑
            </span>
            <span className="font-mono text-[10px] border border-gray-200 rounded-md px-1.5 py-0.5 bg-white">
              ↓
            </span>
            <span className="hidden sm:inline">to navigate</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="font-mono text-[10px] border border-gray-200 rounded-md px-1.5 py-0.5 bg-white">
              ↵
            </span>
            <span className="hidden sm:inline">to select</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="font-mono text-[10px] border border-gray-200 rounded-md px-1.5 py-0.5 bg-white">
              esc
            </span>
            <span className="hidden sm:inline">to close</span>
          </span>
        </div>
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-full max-w-[640px] sm:w-[640px] p-0 gap-0 rounded-3xl overflow-hidden shadow-2xl bg-white border-none outline-none"
        >
          {innerContent}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="p-0 bg-white border-none">
        <div className="sr-only">
          <DrawerTitleUI>Search Command</DrawerTitleUI>
          <DrawerDescUI>Search pages, props, and links</DrawerDescUI>
        </div>
        {innerContent}
      </DrawerContent>
    </Drawer>
  );
}
