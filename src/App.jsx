import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
// import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Selection } from "@tiptap/extensions";
import Toolbar from "./components/toolbar";
import React, { useMemo, useState } from "react";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import EditorSourceMode from "./components/editor-source-mode";
import { TooltipProvider } from "./components/ui/tooltip";
import EditorPropsCtxProvider from "./context/EditorPropsCtxProvider";

/**
 *
 * @param {object} props
 * @param {import("./context/EditorPropsCtx").TEditorPropsCtx['locale']} props.locale
 * @param {import("./context/EditorPropsCtx").TEditorPropsCtx['customTranslate']} props.customTranslate
 * @returns {React.ReactNode}
 */
function App({ locale = "id", customTranslate = {} }) {
  const [isSourceMode, setSourceMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      TaskList,
      TaskItem?.configure({
        nested: true,
      }),
      TextAlign?.configure({
        types: ["heading", "paragraph"],
      }),
      Selection.configure({
        className: "selection",
      }),
    ],
    content: `
    <p>Hello World!</p>

    <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>


        <div>
        <p>Haloo</p>

        <button>Ini button</button>
        </div>
    `,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  const providerValue = useMemo(
    () => ({ editor, setSourceMode, isSourceMode }),
    [editor, setSourceMode, isSourceMode],
  );

  return (
    <EditorPropsCtxProvider locale={locale} customTranslate={customTranslate}>
      <EditorContext.Provider value={providerValue}>
        <TooltipProvider>
          <Toolbar />

          <div
            {...(isSourceMode && {
              style: {
                display: "none",
              },
            })}
          >
            <EditorContent
              editor={editor}
              className="outline-1 p-2.5 rounded-2xl w-2xl mx-auto"
            />
          </div>

          {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
          {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}

          <div
            {...(!isSourceMode && {
              style: {
                display: "none",
              },
            })}
          >
            <EditorSourceMode />
          </div>
        </TooltipProvider>
      </EditorContext.Provider>
    </EditorPropsCtxProvider>
  );
}

export default App;
