import { TaskItem, TaskList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder, Selection } from "@tiptap/extensions";

export const normalizeUrl = (value) => {
  const trimmed = value?.trim();

  if (!trimmed) return "";

  if (
    trimmed?.startsWith("http://") ||
    trimmed?.startsWith("https://") ||
    trimmed?.startsWith("mailto:") ||
    trimmed?.startsWith("tel:")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

export const validateUrl = (value) => {
  if (!value.trim()) {
    return "Link must not be empty.";
  }

  const normalized = normalizeUrl(value);

  try {
    new URL(normalized);
    return "";
  } catch {
    return "Invalid link format.";
  }
};

export const getExtensions = (placeholder) => [
  StarterKit,
  TextStyleKit,
  TaskList,
  TaskItem?.configure({
    nested: true,
  }),
  TextAlign?.configure({
    types: ["heading", "paragraph"],
  }),
  Selection.configure({
    className: "selection",
  }),
  ...(placeholder
    ? [
        Placeholder.configure({
          placeholder,
          showOnlyWhenEditable: false,
        }),
      ]
    : []),
];
