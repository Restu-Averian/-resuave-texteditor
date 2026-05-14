import { EditorContext, useEditor } from "@tiptap/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useMemo, useState } from "react";
import { TooltipProvider } from "./components/ui/tooltip";
import EditorPropsCtxProvider from "./context/EditorPropsCtxProvider";
import useBreakpoint from "./hooks/useBreakpoint";
import TexteditorContent from "./TexteditorContent";
import EditorPreviewMobile from "./components/editor-preview-mobile";
import { cn } from "./lib/utils";
import { getExtensions } from "./helpers";

/**
 *
 * @param {import("@/types").TEditorPropsCtx} props

 * @returns {React.ReactNode}
 */
function Texteditor({
  locale = "en",
  customTranslate = {},
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  readOnly = false,
  readOnlyToolbarMode = "hidden",
  toolbarConfig = {},
  className,
  editorClassName,
  contentClassName,
}) {
  const [isSourceMode, setSourceMode] = useState(false);
  const [showEditableEditorMobile, setShowEditableEditorMobile] =
    useState(false);

  const { xs } = useBreakpoint();

  const defaultClassEditor = useMemo(() => {
    if (xs) {
      return "p-2.5 rounded-2xl w-full mx-auto h-full outline-1 ";
    }
    return "outline-1 p-2.5 rounded-2xl w-2xl mx-auto";
  }, [xs]);

  const extensions = useMemo(() => getExtensions(placeholder), [placeholder]);

  const editor = useEditor(
    {
      extensions,
      content: value,
      editable: !readOnly,
      editorProps: {
        attributes: {
          class: cn(defaultClassEditor, editorClassName),
        },
      },
      onUpdate(e) {
        const editor = e?.editor;

        onChange?.(editor?.getHTML(), e);
      },
      onBlur(e) {
        const editor = e?.editor;

        onBlur?.(editor?.getHTML(), e);
      },
      onFocus(e) {
        const editor = e?.editor;

        onFocus?.(editor?.getHTML(), e);
      },
    },
    [extensions, onBlur, onChange, onFocus],
  );

  const readOnlyMobileEditor = useEditor(
    {
      extensions,
      content: value,
      editable: false,
      editorProps: {
        attributes: {
          class: cn(defaultClassEditor, editorClassName),
        },
      },
    },
    [extensions],
  );

  useEffect(() => {
    editor?.setEditable(!readOnly);
    if (readOnly) {
      setSourceMode(false);
    }
  }, [editor, readOnly]);

  useEffect(() => {
    editor?.setOptions({
      editorProps: {
        attributes: {
          class: cn(defaultClassEditor, editorClassName),
        },
      },
    });

    readOnlyMobileEditor?.setOptions({
      editorProps: {
        attributes: {
          class: cn(defaultClassEditor, editorClassName),
        },
      },
    });
  }, [editor, readOnlyMobileEditor, defaultClassEditor, editorClassName]);

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
      readOnly={readOnly}
      toolbarConfig={toolbarConfig}
      contentClassName={contentClassName}
      readOnlyToolbarMode={readOnlyToolbarMode}
    >
      <div className={className}>
        <EditorContext.Provider value={providerValue}>
          <TooltipProvider>
            {xs && !readOnly ? (
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
      </div>
    </EditorPropsCtxProvider>
  );
}

export default Texteditor;
