import { EditorContext, useEditor } from "@tiptap/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useMemo, useState } from "react";
import { TooltipProvider } from "./components/ui/tooltip";
import EditorPropsCtxProvider from "./context/EditorPropsCtxProvider";
import useBreakpoint from "./hooks/useBreakpoint";
import Texteditor from "./Texteditor";
import { EXTENSIONS } from "./constants";
import EditorPreviewMobile from "./components/editor-preview-mobile";

/**
 *
 * @param {object} props
 * @param {import("./context/EditorPropsCtx").TEditorPropsCtx['locale']} props.locale
 * @param {import("./context/EditorPropsCtx").TEditorPropsCtx['customTranslate']} props.customTranslate
 * @param {import("./context/EditorPropsCtx").TEditorPropsCtx['disableMobileBehavior']} props.disableMobileBehavior
 * @returns {React.ReactNode}
 */
function App({
  locale = "en",
  customTranslate = {},
  disableMobileBehavior = false,
}) {
  const [isSourceMode, setSourceMode] = useState(false);
  const [showEditableEditorMobile, setShowEditableEditorMobile] =
    useState(false);
  const { xs } = useBreakpoint();

  const styleEditor = useMemo(() => {
    if (xs) {
      return "p-2.5 rounded-2xl w-full mx-auto h-full";
    }
    return "outline-1 p-2.5 rounded-2xl w-2xl mx-auto";
  }, [xs]);

  const content = `
    <p>Hello World!</p>

    <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>


        <div>
        <p>Haloo</p>

        <button>Ini button</button>
        </div>
    `;

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: content,
    editorProps: {
      attributes: {
        class: styleEditor,
      },
    },
  });

  const readOnlyMobileEditor = useEditor({
    extensions: EXTENSIONS,
    content,
    editorProps: {
      attributes: {
        class: styleEditor,
      },
    },
  });

  const providerValue = useMemo(
    () => ({
      editor,
      readOnlyMobileEditor,
      setSourceMode,
      isSourceMode,
      setShowEditableEditorMobile,
    }),
    [
      editor,
      setSourceMode,
      isSourceMode,
      readOnlyMobileEditor,
      setShowEditableEditorMobile,
    ],
  );

  return (
    <EditorPropsCtxProvider
      locale={locale}
      customTranslate={customTranslate}
      disableMobileBehavior={disableMobileBehavior}
    >
      <EditorContext.Provider value={providerValue}>
        <TooltipProvider>
          {xs ? (
            <Dialog
              open={showEditableEditorMobile}
              onOpenChange={setShowEditableEditorMobile}
            >
              <DialogTrigger asChild>
                <div>
                  <EditorPreviewMobile />
                </div>
              </DialogTrigger>

              <DialogContent className="w-full h-full translate-0 inset-0 max-w-full">
                <Texteditor />
              </DialogContent>
            </Dialog>
          ) : (
            <Texteditor />
          )}
        </TooltipProvider>
      </EditorContext.Provider>
    </EditorPropsCtxProvider>
  );
}

export default App;
