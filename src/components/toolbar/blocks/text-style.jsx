import { Fragment, memo, useMemo } from "react";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import {
  AArrowDown,
  AArrowUp,
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import ToolbarItem from "../components/toolbar-item";
import ResponsiveWrapperToolbarItem from "../components/responsive-wrapper-toolbar-item";

const ToolbarTextStyle_ = () => {
  const { editor, isSourceMode } = useCurrentEditor();

  const t = useTranslation();

  const editorState = useEditorState({
    editor,
    selector(ctx) {
      return {
        isBold: ctx?.editor?.isActive("bold"),
        isUnderline: ctx?.editor?.isActive("underline"),
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
      <ResponsiveWrapperToolbarItem className="flex justify-center items-center">
        <ToolbarItem
          disabled={isSourceMode}
          isActive={editorState?.isBold}
          icon={<Bold />}
          onClick={() => editor?.chain()?.focus()?.toggleBold().run()}
          label={t("BOLD", "Bold")}
        />

        <ToolbarItem
          disabled={isSourceMode}
          isActive={editorState?.isItalic}
          icon={<Italic />}
          onClick={() => editor?.chain()?.focus()?.toggleItalic().run()}
          label={t("ITALIC", "Italic")}
        />

        <ToolbarItem
          disabled={isSourceMode}
          isActive={editorState?.isUnderline}
          icon={<Underline />}
          onClick={() => editor?.chain()?.focus()?.toggleUnderline().run()}
          label={t("UNDERLINE", "Underline")}
        />

        <ToolbarItem
          disabled={isSourceMode}
          isActive={editorState?.isStrikeThrough}
          icon={<Strikethrough />}
          onClick={() => editor?.chain()?.focus()?.toggleStrike().run()}
          label={t("STRIKE_THROUGH", "Strike Through")}
        />
      </ResponsiveWrapperToolbarItem>

      <ResponsiveWrapperToolbarItem className="flex justify-center items-center">
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
          label={t("INCREASE_FONT_SIZE", "Increase Font Size")}
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
          label={t("DECREASE_FONT_SIZE", "Decrease Font Size")}
        />
      </ResponsiveWrapperToolbarItem>
    </>
  );
};

const ToolbarTextStyle = memo(ToolbarTextStyle_);
export default ToolbarTextStyle;
