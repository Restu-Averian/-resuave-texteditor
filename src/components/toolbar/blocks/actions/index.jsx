import { memo } from "react";
import { CodeXmlIcon, Redo, Undo } from "lucide-react";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import * as prettier from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import useTranslation from "@/hooks/useTranslation";
import ResponsiveWrapperToolbarItem from "../../components/responsive-wrapper-toolbar-item";
import ToolbarItem from "../../components/toolbar-item";
import useToolbarConfig from "@/hooks/useToolbarConfig";

const ToolbarActions_ = () => {
  const t = useTranslation();

  const { editor, setSourceMode, isSourceMode } = useCurrentEditor();
  const { checkShowToolbarItem } = useToolbarConfig();

  const editorState = useEditorState({
    editor,
    selector(ctx) {
      if (!ctx?.editor) return { isUndo: false, isRedo: false };

      return {
        isUndo: ctx.editor.can().chain().focus().undo().run(),
        isRedo: ctx.editor.can().chain().focus().redo().run(),
      };
    },
  });
  return (
    <ResponsiveWrapperToolbarItem className="flex justify-center items-center">
      {checkShowToolbarItem("undo") && (
        <ToolbarItem
          disabled={editorState?.isUndo === false}
          icon={<Undo />}
          onClick={() => editor?.chain()?.focus()?.undo()?.run()}
          label={t("UNDO", "Undo")}
        />
      )}

      {checkShowToolbarItem("redo") && (
        <ToolbarItem
          disabled={editorState?.isRedo === false}
          icon={<Redo />}
          onClick={() => editor?.chain()?.focus()?.redo()?.run()}
          label={t("REDO", "Redo")}
        />
      )}

      {checkShowToolbarItem("source") && (
        <ToolbarItem
          isActive={isSourceMode}
          onClick={() => {
            const htmlVal = editor?.getHTML();

            prettier
              ?.format(htmlVal, {
                parser: "html",
                plugins: [prettierPluginHtml],
              })
              ?.then((fmtVal) => {
                editor?.chain()?.setContent(fmtVal)?.run();
                setSourceMode(!isSourceMode);
              });
          }}
          icon={<CodeXmlIcon />}
          label={t("SOURCE", "Source")}
        />
      )}
    </ResponsiveWrapperToolbarItem>
  );
};

const ToolbarActions = memo(ToolbarActions_);
export default ToolbarActions;
