import { EditorContent, useCurrentEditor } from "@tiptap/react";
import { memo, useEffect, useState } from "react";
import Toolbar from "./components/toolbar";
import EditorSourceMode from "./components/editor-source-mode";
import useBreakpoint from "./hooks/useBreakpoint";
import ToolbarMobile from "./components/toolbar/toolbar-mobile";
import { Button } from "./components/ui/button";
import { Edit2 } from "lucide-react";

const Texteditor_ = () => {
  const { editor, isSourceMode } = useCurrentEditor();

  const { xs } = useBreakpoint();

  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [showToolbarMobile, setShowToolbarMobile] = useState(false);

  useEffect(() => {
    const vv = window?.visualViewport;
    if (!vv) return;

    const update = () => {
      const offset = Math.max(
        0,
        window.innerHeight - vv?.height - vv?.offsetTop,
      );
      setKeyboardOffset(offset);
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <>
      {!xs && <Toolbar />}

      <div
        {...(isSourceMode && {
          className: "hidden",
        })}
        {...(xs && {
          onClick() {
            setShowToolbarMobile(false);
          },
        })}
      >
        <EditorContent
          editor={editor}
          {...(xs && {
            className: "h-full",
          })}
        />
      </div>

      <div
        {...(!isSourceMode && {
          style: {
            display: "none",
          },
        })}
      >
        <EditorSourceMode />
      </div>

      {xs && (
        <div
          className="fixed left-0 right-0 z-50"
          style={{
            bottom: `${keyboardOffset}px`,
          }}
        >
          <div className="w-full text-right pr-5 pb-5">
            <Button>
              <Edit2 /> Done
            </Button>
          </div>

          <ToolbarMobile
            showToolbarMobile={showToolbarMobile}
            setShowToolbarMobile={setShowToolbarMobile}
          />
        </div>
      )}
    </>
  );
};

const Texteditor = memo(Texteditor_);
export default Texteditor;
