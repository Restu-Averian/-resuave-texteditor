import { memo, useMemo } from "react";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { Button } from "../ui/button";
import {
  AArrowDown,
  AArrowUp,
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";

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
      <Button
        variant={editorState?.isBold ? "default" : "ghost"}
        onClick={() => {
          editor?.chain()?.focus()?.toggleBold().run();
        }}
        disabled={isSourceMode}
      >
        <Bold />
      </Button>

      <Button
        variant={editorState?.isItalic ? "default" : "ghost"}
        onClick={() => {
          editor?.chain()?.focus()?.toggleItalic().run();
        }}
        disabled={isSourceMode}
      >
        <Italic />
      </Button>

      <Button
        variant={editorState?.isUnderline ? "default" : "ghost"}
        onClick={() => {
          editor?.chain()?.focus()?.toggleUnderline().run();
        }}
        disabled={isSourceMode}
      >
        <Underline />
      </Button>

      <Button
        variant={editorState?.isStrikeThrough ? "default" : "ghost"}
        onClick={() => {
          editor?.chain()?.focus()?.toggleStrike().run();
        }}
        disabled={isSourceMode}
      >
        <Strikethrough />
      </Button>

      <Button
        variant="ghost"
        onClick={() => {
          editor
            .chain()
            .focus()
            .setFontSize(`${numFontSize + 1}px`)
            .run();
        }}
        disabled={isSourceMode}
      >
        <AArrowUp />
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          if (numFontSize > 0) {
            editor
              .chain()
              .focus()
              .setFontSize(`${numFontSize - 1}px`)
              .run();
          }
        }}
        disabled={isSourceMode}
      >
        <AArrowDown />
      </Button>
    </>
  );
};

const ToolbarTextStyle = memo(ToolbarTextStyle_);
export default ToolbarTextStyle;
