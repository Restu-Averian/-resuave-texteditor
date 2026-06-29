import useTranslation from "@/hooks/useTranslation";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Tooltip from "@/components/ui/shared/tooltip";
import useToolbarConfig from "@/hooks/useToolbarConfig";

const HEADING_ICON = {
  1: <Heading1 />,
  2: <Heading2 />,
  3: <Heading3 />,
  4: <Heading4 />,
  5: <Heading5 />,
  6: <Heading6 />,
};

const HeadingItem_ = () => {
  const t = useTranslation();

  const { editor, isSourceMode } = useCurrentEditor();
  const { checkDisableToolbarItem, checkShowToolbarItem } = useToolbarConfig();

  const isDisabled = useMemo(
    () => isSourceMode || checkDisableToolbarItem,
    [isSourceMode, checkDisableToolbarItem],
  );

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
    <DropdownMenu>
      <Tooltip content={t("HEADING", "Heading")}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isActiveHeading ? "default" : "ghost"}
            disabled={isDisabled}
          >
            <Heading />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {Array.from({ length: 6 })?.map((_, idx) => {
            const level = idx + 1;
            if (!checkShowToolbarItem(`heading${level}`)) {
              return null;
            }

            return (
              <DropdownMenuItem
                key={idx}
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level })
                      .run();
                  }
                }}
              >
                <Button
                  disabled={isDisabled}
                  variant={
                    editorState?.[`isHeading${level}`] ? "default" : "ghost"
                  }
                >
                  {HEADING_ICON?.[level]}
                  {t("HEADING", "Heading")} {level}
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingItem = memo(HeadingItem_);
export default HeadingItem;
