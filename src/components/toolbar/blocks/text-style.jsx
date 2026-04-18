import { memo, useMemo } from "react";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import {
  AArrowDown,
  AArrowUp,
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import ToolbarItem from "../components/toolbar-item";

const ToolbarTextStyle_ = () => {
  const { editor, isSourceMode } = useCurrentEditor();

  const editorState = useEditorState({
    editor,
    selector(ctx) {
      return {
        isBold: ctx?.editor?.isActive("bold"),
        isItalic: ctx?.editor?.isActive("italic"),
        isStrikeThrough: ctx?.editor?.isActive("strike"),
        fontSize: ctx?.editor?.getAttributes("textStyle")?.fontSize || "16px",
      };
    },
  });

  const numFontSize = useMemo(() => {
    return Number(editorState?.fontSize?.replaceAll("px", ""));
  }, [editorState?.fontSize]);
  return (
    <>
      <ToolbarItem
        disabled={isSourceMode}
        isActive={editorState?.isBold}
        icon={<Bold />}
        onClick={() => editor?.chain()?.focus()?.toggleBold().run()}
        label="Bold"
      />

      <ToolbarItem
        disabled={isSourceMode}
        isActive={editorState?.isItalic}
        icon={<Italic />}
        onClick={() => editor?.chain()?.focus()?.toggleItalic().run()}
        label="Italic"
      />

      <ToolbarItem
        disabled={isSourceMode}
        isActive={editorState?.isUnderline}
        icon={<Underline />}
        onClick={() => editor?.chain()?.focus()?.toggleUnderline().run()}
        label="Underline"
      />

      <ToolbarItem
        disabled={isSourceMode}
        isActive={editorState?.isStrikeThrough}
        icon={<Strikethrough />}
        onClick={() => editor?.chain()?.focus()?.toggleStrike().run()}
        label="Strike Through"
      />

      <ToolbarItem
        disabled={isSourceMode}
        icon={<AArrowUp />}
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFontSize(`${numFontSize + 1}px`)
            .run();
        }}
        label="Increase Font Size"
      />

      <ToolbarItem
        disabled={isSourceMode || numFontSize <= 0}
        icon={<AArrowDown />}
        onClick={() => {
          if (numFontSize > 0) {
            editor
              .chain()
              .focus()
              .setFontSize(`${numFontSize - 1}px`)
              .run();
          }
        }}
        label="Decrease Font Size"
      />
    </>
  );
};

const ToolbarTextStyle = memo(ToolbarTextStyle_);
export default ToolbarTextStyle;
