import { EditorContent, useCurrentEditor } from "@tiptap/react";
import { memo } from "react";
import ToolbarTextStyle from "../toolbar/blocks/text-style";

const EditorPreviewMobile_ = () => {
  const { previewEditor } = useCurrentEditor();
  return (
    <>
      <div className="toolbar">
        <div className="toolbar-item">
          <ToolbarTextStyle />
        </div>
      </div>

      <EditorContent editor={previewEditor} />
    </>
  );
};

const EditorPreviewMobile = memo(EditorPreviewMobile_);
export default EditorPreviewMobile;
