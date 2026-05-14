import { EditorContent, useCurrentEditor } from "@tiptap/react";
import { memo } from "react";
import ToolbarTextStyle from "../toolbar/blocks/text-style";
import { useEditorPropsCtx } from "@/context/EditorPropsCtx";
import useToolbarConfig from "@/hooks/useToolbarConfig";
import { cn } from "@/lib/utils";

const EditorPreviewMobile_ = () => {
  const { readOnlyMobileEditor } = useCurrentEditor();
  const { contentClassName } = useEditorPropsCtx();
  const { checkShowToolbarGroup } = useToolbarConfig();

  return (
    <>
      {checkShowToolbarGroup("textStyle") && (
        <div className="toolbar">
          <div className="toolbar-item">
            <ToolbarTextStyle isPreview />
          </div>
        </div>
      )}

      <EditorContent
        editor={readOnlyMobileEditor}
        className={cn(contentClassName)}
      />
    </>
  );
};

const EditorPreviewMobile = memo(EditorPreviewMobile_);
export default EditorPreviewMobile;
