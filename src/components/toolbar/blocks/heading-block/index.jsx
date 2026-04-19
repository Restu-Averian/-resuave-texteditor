import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { Minus, TextQuote } from "lucide-react";
import { memo } from "react";
import useTranslation from "@/hooks/useTranslation";
import ToolbarItem from "../../components/toolbar-item";
import ResponsiveWrapperToolbarItem from "../../components/responsive-wrapper-toolbar-item";
import HeadingItem from "./heading-item";

const ToolbarHeadingBlock_ = () => {
  const t = useTranslation();

  const { editor, isSourceMode } = useCurrentEditor();

  const editorState = useEditorState({
    editor,
    selector(ctx) {
      return {
        isHorizontalRule: ctx?.editor?.isActive("horizontalRule"),
        isBlockquote: ctx?.editor?.isActive("blockquote"),
      };
    },
  });

  return (
    <ResponsiveWrapperToolbarItem className="flex justify-center items-center">
      <ToolbarItem
        icon={<TextQuote />}
        label={t("BLOCKQUOTE", "Blockquote")}
        onClick={() => editor?.chain()?.toggleBlockquote()?.run()}
        disabled={isSourceMode}
        isActive={editorState?.isBlockquote}
      />

      <HeadingItem />

      <ToolbarItem
        icon={<Minus />}
        label={t("HORIZONTAL_RULE", "Horizontal Rule")}
        onClick={() => editor?.chain()?.focus()?.setHorizontalRule()?.run()}
        disabled={isSourceMode}
        isActive={editorState?.isHorizontalRule}
      />
    </ResponsiveWrapperToolbarItem>
  );
};

const ToolbarHeadingBlock = memo(ToolbarHeadingBlock_);
export default ToolbarHeadingBlock;
