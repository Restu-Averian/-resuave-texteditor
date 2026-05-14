import { memo, useMemo } from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  List,
  ListOrdered,
  ListTodo,
} from "lucide-react";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import Tooltip from "@/components/ui/shared/tooltip";
import useTranslation from "@/hooks/useTranslation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ToolbarItem from "../../components/toolbar-item";
import ResponsiveWrapperToolbarItem from "../../components/responsive-wrapper-toolbar-item";
import useToolbarConfig from "@/hooks/useToolbarConfig";

const ToolbarLists_ = () => {
  const t = useTranslation();

  const { editor, isSourceMode } = useCurrentEditor();
  const { checkShowToolbarItem } = useToolbarConfig();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBulletList: ctx?.editor.isActive("bulletList"),
        isOrderedList: ctx?.editor.isActive("orderedList"),
        isTaskList: ctx?.editor.isActive("taskList"),
        alignValue: {
          left: ctx.editor.isActive({ textAlign: "left" }) ?? false,
          right: ctx.editor.isActive({ textAlign: "right" }) ?? false,
          center: ctx.editor.isActive({ textAlign: "center" }) ?? false,
          justify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
        },
      };
    },
  });

  const alignValue = useMemo(() => {
    const entriesAlignValue = Object?.entries(editorState?.alignValue || {});
    const idxActive = entriesAlignValue?.findIndex(
      (item) => item?.[1] === true,
    );

    if (idxActive !== -1) {
      return entriesAlignValue?.[idxActive]?.[0];
    }
    return "left";
  }, [editorState?.alignValue]);
  return (
    <>
      <ResponsiveWrapperToolbarItem className="flex justify-center items-center">
        {checkShowToolbarItem("bulletList") && (
          <ToolbarItem
            disabled={isSourceMode}
            icon={<List />}
            onClick={() => editor?.chain()?.focus()?.toggleBulletList()?.run()}
            label={t("BULLET_LIST", "Bullet List")}
          />
        )}

        {checkShowToolbarItem("orderedList") && (
          <ToolbarItem
            disabled={isSourceMode}
            isActive={editorState?.isOrderedList}
            icon={<ListOrdered />}
            onClick={() => editor?.chain()?.focus()?.toggleOrderedList()?.run()}
            label={t("ORDERED_LIST", "Ordered List")}
          />
        )}

        {checkShowToolbarItem("taskList") && (
          <ToolbarItem
            disabled={isSourceMode}
            isActive={editorState?.isTaskList}
            icon={<ListTodo />}
            onClick={() => editor?.chain()?.focus()?.toggleTaskList()?.run()}
            label={t("TASK_LIST", "Task List")}
          />
        )}
      </ResponsiveWrapperToolbarItem>

      <ResponsiveWrapperToolbarItem className="flex justify-center items-center">
        {checkShowToolbarItem("align") && (
          <ToggleGroup
            type="single"
            value={alignValue}
            variant="outline"
            onValueChange={(value) => {
              editor?.chain()?.focus()?.toggleTextAlign(value)?.run();
            }}
            disabled={isSourceMode}
          >
            {checkShowToolbarItem("alignLeft") && (
              <Tooltip content={t("ALIGN_LEFT", "Align Left")}>
                <ToggleGroupItem value="left">
                  <AlignLeftIcon />
                </ToggleGroupItem>
              </Tooltip>
            )}

            {checkShowToolbarItem("alignCenter") && (
              <Tooltip content={t("ALIGN_CENTER", "Align Center")}>
                <ToggleGroupItem value="center">
                  <AlignCenterIcon />
                </ToggleGroupItem>
              </Tooltip>
            )}

            {checkShowToolbarItem("alignRight") && (
              <Tooltip content={t("ALIGN_RIGHT", "Align Right")}>
                <ToggleGroupItem value="right">
                  <AlignRightIcon />
                </ToggleGroupItem>
              </Tooltip>
            )}

            {checkShowToolbarItem("alignJustify") && (
              <Tooltip content={t("ALIGN_JUSTIFY", "Align Justify")}>
                <ToggleGroupItem value="justify">
                  <AlignJustifyIcon />
                </ToggleGroupItem>
              </Tooltip>
            )}
          </ToggleGroup>
        )}
      </ResponsiveWrapperToolbarItem>
    </>
  );
};

const ToolbarLists = memo(ToolbarLists_);
export default ToolbarLists;
