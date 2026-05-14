import { EditorContext, useEditor } from "@tiptap/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useMemo, useState } from "react";
import { TooltipProvider } from "./components/ui/tooltip";
import EditorPropsCtxProvider from "./context/EditorPropsCtxProvider";
import useBreakpoint from "./hooks/useBreakpoint";
import TexteditorContent from "./TexteditorContent";
import { EXTENSIONS } from "./constants";
import EditorPreviewMobile from "./components/editor-preview-mobile";

/**
 *
 * @param {import("./context/EditorPropsCtx").TEditorPropsCtx} props

 * @returns {React.ReactNode}
 */
function Texteditor({ locale = "en", customTranslate = {}, value, onChange }) {
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

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: value,
    editorProps: {
      attributes: {
        class: styleEditor,
      },
    },
    onUpdate(e) {
      const editor = e?.editor;

      onChange(editor?.getHTML(), e);
    },
  });

  const readOnlyMobileEditor = useEditor({
    extensions: EXTENSIONS,
    content: value,
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
      value={value}
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
                <TexteditorContent />
              </DialogContent>
            </Dialog>
          ) : (
            <TexteditorContent />
          )}
        </TooltipProvider>
      </EditorContext.Provider>
    </EditorPropsCtxProvider>
  );
}

export default Texteditor;
