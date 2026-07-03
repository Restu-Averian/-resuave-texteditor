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
  const { checkDisableToolbarItem, checkShowToolbarItem } = useToolbarConfig();
  const isDisabled = useMemo(
    () => isSourceMode || checkDisableToolbarItem,
    [isSourceMode, checkDisableToolbarItem],
  );

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
      <ResponsiveWrapperToolbarItem className="flex justify-center items-center gap-2 mb-2">
        {checkShowToolbarItem("bulletList") && (
          <ToolbarItem
            disabled={isDisabled}
            icon={<List />}
            onClick={() => editor?.chain()?.focus()?.toggleBulletList()?.run()}
            label={t("BULLET_LIST", "Bullet List")}
          />
        )}

        {checkShowToolbarItem("orderedList") && (
          <ToolbarItem
            disabled={isDisabled}
            isActive={editorState?.isOrderedList}
            icon={<ListOrdered />}
            onClick={() => editor?.chain()?.focus()?.toggleOrderedList()?.run()}
            label={t("ORDERED_LIST", "Ordered List")}
          />
        )}

        {checkShowToolbarItem("taskList") && (
          <ToolbarItem
            disabled={isDisabled}
            isActive={editorState?.isTaskList}
            icon={<ListTodo />}
            onClick={() => editor?.chain()?.focus()?.toggleTaskList()?.run()}
            label={t("TASK_LIST", "Task List")}
          />
        )}
      </ResponsiveWrapperToolbarItem>

      {checkShowToolbarItem("align") && (
        <ResponsiveWrapperToolbarItem className="flex justify-center items-center gap-2 flex-wrap">
          {checkShowToolbarItem("alignLeft") && (
            <ToolbarItem
              disabled={isDisabled}
              isActive={alignValue === "left"}
              icon={<AlignLeftIcon />}
              onClick={() => editor?.chain()?.focus()?.toggleTextAlign("left")?.run()}
              label={t("ALIGN_LEFT", "Align Left")}
            />
          )}

          {checkShowToolbarItem("alignCenter") && (
            <ToolbarItem
              disabled={isDisabled}
              isActive={alignValue === "center"}
              icon={<AlignCenterIcon />}
              onClick={() => editor?.chain()?.focus()?.toggleTextAlign("center")?.run()}
              label={t("ALIGN_CENTER", "Align Center")}
            />
          )}

          {checkShowToolbarItem("alignRight") && (
            <ToolbarItem
              disabled={isDisabled}
              isActive={alignValue === "right"}
              icon={<AlignRightIcon />}
              onClick={() => editor?.chain()?.focus()?.toggleTextAlign("right")?.run()}
              label={t("ALIGN_RIGHT", "Align Right")}
            />
          )}

          {checkShowToolbarItem("alignJustify") && (
            <ToolbarItem
              disabled={isDisabled}
              isActive={alignValue === "justify"}
              icon={<AlignJustifyIcon />}
              onClick={() => editor?.chain()?.focus()?.toggleTextAlign("justify")?.run()}
              label={t("ALIGN_JUSTIFY", "Align Justify")}
            />
          )}
        </ResponsiveWrapperToolbarItem>
      )}
    </>
  );
};

const ToolbarLists = memo(ToolbarLists_);
export default ToolbarLists;
