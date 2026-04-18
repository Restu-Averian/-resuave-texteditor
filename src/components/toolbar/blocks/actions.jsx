import { memo } from "react";
import { CodeXmlIcon, Redo, Undo } from "lucide-react";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import * as prettier from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import { Button } from "@/components/ui/button";
import ToolbarItem from "../components/toolbar-item";

const ToolbarActions_ = () => {
  const { editor, setSourceMode, isSourceMode } = useCurrentEditor();

  const editorState = useEditorState({
    editor,
    selector(ctx) {
      return {
        isUndo: ctx.editor.can().chain().focus().undo().run(),
        isRedo: ctx.editor.can().chain().focus().redo().run(),
      };
    },
  });
  return (
    <>
      <ToolbarItem
        disabled={editorState?.isUndo === false}
        icon={<Undo />}
        onClick={() => editor?.chain()?.focus()?.undo()?.run()}
      />

      <ToolbarItem
        disabled={editorState?.isRedo === false}
        icon={<Redo />}
        onClick={() => editor?.chain()?.focus()?.redo()?.run()}
      />

      <Button
        variant={isSourceMode ? "outline" : "ghost"}
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
      >
        <CodeXmlIcon />
      </Button>
    </>
  );
};

const ToolbarActions = memo(ToolbarActions_);
export default ToolbarActions;
