import { html } from "@codemirror/lang-html";
import { useCurrentEditor } from "@tiptap/react";
import { memo, useEffect, useState } from "react";
import { format } from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import ReactCodeMirror from "@uiw/react-codemirror";

const EditorSourceMode_ = () => {
  const { editor, isSourceMode } = useCurrentEditor();

  const [value, setValue] = useState(editor?.getHTML());

  const onPrettierHTML = () => {
    format(editor?.getHTML(), {
      parser: "html",
      plugins: [prettierPluginHtml],
    })?.then((fmtValue) => {
      setValue(fmtValue);
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
    <>
      <ReactCodeMirror
        height="300px"
        className="outline-1 p-2.5 rounded-2xl w-2xl mx-auto"
        extensions={[html()]}
        basicSetup={{
          autocompletion: true,
        }}
        value={value}
        onChange={(val) => setValue(val)}
      />
    </>
  );
};

const EditorSourceMode = memo(EditorSourceMode_);
export default EditorSourceMode;
