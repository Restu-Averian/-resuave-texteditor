import { html } from "@codemirror/lang-html";
import { useCurrentEditor } from "@tiptap/react";
import { memo, useEffect, useState } from "react";
import { format } from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import ReactCodeMirror from "@uiw/react-codemirror";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tooltip from "../ui/shared/tooltip";

const EditorSourceMode_ = () => {
  const { editor, isSourceMode } = useCurrentEditor();

  const [value, setValue] = useState(editor?.getHTML());

  const onPrettierHTML = () => {
    format(editor?.getHTML(), {
      parser: "html",
      plugins: [prettierPluginHtml],
    })?.then((fmtHTML) => {
      setValue(fmtHTML);
    });
  };

  const onDownloadHTML = () => {
    format(editor?.getHTML(), {
      parser: "html",
      plugins: [prettierPluginHtml],
    })?.then((fmtHTML) => {
      const blob = new Blob([fmtHTML], {
        type: "text/html;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "index.html";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    if (isSourceMode) {
      onPrettierHTML();
    } else {
      editor?.chain()?.setContent(value)?.run();
    }
  }, [isSourceMode]);

  return (
    <div className="relative w-2xl mx-auto">
      <ReactCodeMirror
        height="300px"
        className="outline-1 p-2.5 rounded-2xl "
        extensions={[html()]}
        basicSetup={{
          autocompletion: true,
        }}
        value={value}
        onChange={(val) => setValue(val)}
      />

      <Tooltip content="Download HTML">
        <Button
          variant="ghost"
          onClick={() => onDownloadHTML()}
          className="absolute top-2 right-2"
        >
          <Download />
        </Button>
      </Tooltip>
    </div>
  );
};

const EditorSourceMode = memo(EditorSourceMode_);
export default EditorSourceMode;
