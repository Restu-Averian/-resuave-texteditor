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
import useTranslation from "@/hooks/useTranslation";
import useToolbarConfig from "@/hooks/useToolbarConfig";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import ToolbarItem from "../../components/toolbar-item";
import ResponsiveWrapperToolbarItem from "../../components/responsive-wrapper-toolbar-item";

const ToolbarTextStyle_ = ({ isPreview = false }) => {
  const { editor, isSourceMode } = useCurrentEditor();
  const { checkShowToolbarItem } = useToolbarConfig();

  const { xs } = useBreakpoint();

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
    <div className="px-3">
      <ResponsiveWrapperToolbarItem
        isPreview={isPreview}
        className={cn(
          "flex justify-center items-center mb-2 gap-2",
          xs && isPreview === false && "justify-start",
        )}
      >
        {checkShowToolbarItem("bold") && (
          <ToolbarItem
            disabled={isSourceMode}
            isActive={editorState?.isBold}
            icon={<Bold />}
            onClick={() => editor?.chain()?.focus()?.toggleBold().run()}
            label={t("BOLD", "Bold")}
            isPreview={isPreview}
          />
        )}

        {checkShowToolbarItem("italic") && (
          <ToolbarItem
            disabled={isSourceMode}
            isActive={editorState?.isItalic}
            icon={<Italic />}
            onClick={() => editor?.chain()?.focus()?.toggleItalic().run()}
            label={t("ITALIC", "Italic")}
            isPreview={isPreview}
          />
        )}

        {checkShowToolbarItem("underline") && (
          <ToolbarItem
            disabled={isSourceMode}
            isActive={editorState?.isUnderline}
            icon={<Underline />}
            onClick={() => editor?.chain()?.focus()?.toggleUnderline().run()}
            label={t("UNDERLINE", "Underline")}
            isPreview={isPreview}
          />
        )}

        {checkShowToolbarItem("strike") && (
          <ToolbarItem
            disabled={isSourceMode}
            isActive={editorState?.isStrikeThrough}
            icon={<Strikethrough />}
            onClick={() => editor?.chain()?.focus()?.toggleStrike().run()}
            label={t("STRIKE_THROUGH", "Strike Through")}
            isPreview={isPreview}
          />
        )}
      </ResponsiveWrapperToolbarItem>

      <ResponsiveWrapperToolbarItem
        isPreview={isPreview}
        className={cn(
          "flex justify-center items-center mb-2 gap-2",
          xs && isPreview === false && "justify-start",
        )}
      >
        {checkShowToolbarItem("increaseFontSize") && (
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
            isPreview={isPreview}
          />
        )}

        {checkShowToolbarItem("decreaseFontSize") && (
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
            isPreview={isPreview}
          />
        )}
      </ResponsiveWrapperToolbarItem>
    </div>
  );
};

const ToolbarTextStyle = memo(ToolbarTextStyle_);
export default ToolbarTextStyle;
