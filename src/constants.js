import { TaskItem, TaskList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Selection } from "@tiptap/extensions";

export const EXTENSIONS = [
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
];
