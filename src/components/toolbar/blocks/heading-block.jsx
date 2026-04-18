import { useCurrentEditor, useEditorState } from "@tiptap/react";
import {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Minus,
  TextQuote,
} from "lucide-react";
import { memo, useMemo } from "react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const HEADING_ICON = {
  1: <Heading1 />,
  2: <Heading2 />,
  3: <Heading3 />,
  4: <Heading4 />,
  5: <Heading5 />,
  6: <Heading6 />,
};

const ToolbarHeadingBlock_ = () => {
  const { editor, isSourceMode } = useCurrentEditor();

  const editorState = useEditorState({
    editor,
    selector(ctx) {
      const objHeading = Array.from({ length: 6 })?.reduce((acc, _, index) => {
        acc[`isHeading${index + 1}`] =
          ctx?.editor?.isActive("heading", {
            level: index + 1,
          }) || false;

        return acc;
      }, {});

      return {
        ...(objHeading || {}),
        isHorizontalRule: ctx?.editor?.isActive("horizontalRule"),
        isBlockquote: ctx?.editor?.isActive("blockquote"),
      };
    },
  });

  const isActiveHeading = useMemo(
    () =>
      Object.keys(HEADING_ICON)?.some(
        (key) => editorState?.[`isHeading${key}`] === true,
      ),
    [editorState],
  );
  return (
    <>
      <Button
        variant={editorState?.isBlockquote ? "default" : "ghost"}
        disabled={isSourceMode}
        onClick={() => editor?.chain()?.toggleBlockquote()?.run()}
      >
        <TextQuote />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isActiveHeading ? "default" : "ghost"}
            disabled={isSourceMode}
          >
            <Heading />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            {Array.from({ length: 6 })?.map((_, idx) => {
              const level = idx + 1;
              return (
                <DropdownMenuItem
                  key={idx}
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level })
                      .run();
                  }}
                >
                  <Button
                    disabled={isSourceMode}
                    variant={
                      editorState?.[`isHeading${level}`] ? "default" : "ghost"
                    }
                  >
                    {HEADING_ICON?.[level]}
                    Heading {level}
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        disabled={isSourceMode}
        variant={editorState?.isHorizontalRule ? "default" : "ghost"}
        onClick={() => {
          editor?.chain()?.focus()?.setHorizontalRule()?.run();
        }}
      >
        <Minus />
      </Button>
    </>
  );
};

const ToolbarHeadingBlock = memo(ToolbarHeadingBlock_);
export default ToolbarHeadingBlock;
