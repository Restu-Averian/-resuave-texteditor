import { memo } from "react";
import { CodeXmlIcon, Redo, Undo } from "lucide-react";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import * as prettier from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import { Button } from "../ui/button";

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
      <Button
        variant="ghost"
        disabled={editorState?.isUndo === false}
        onClick={() => {
          editor?.chain()?.focus()?.undo()?.run();
        }}
      >
        <Undo />
      </Button>
      <Button
        disabled={editorState?.isRedo === false}
        variant="ghost"
        onClick={() => {
          editor?.chain()?.focus()?.redo()?.run();
        }}
      >
        <Redo />
      </Button>

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
