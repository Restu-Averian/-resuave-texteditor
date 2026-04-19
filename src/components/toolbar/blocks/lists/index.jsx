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

const ToolbarLists_ = () => {
  const t = useTranslation();

  const { editor, isSourceMode } = useCurrentEditor();

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
        <ToolbarItem
          disabled={isSourceMode}
          icon={<List />}
          onClick={() => editor?.chain()?.focus()?.toggleBulletList()?.run()}
          label={t("BULLET_LIST", "Bullet List")}
        />

        <ToolbarItem
          disabled={isSourceMode}
          isActive={editorState?.isOrderedList}
          icon={<ListOrdered />}
          onClick={() => editor?.chain()?.focus()?.toggleOrderedList()?.run()}
          label={t("ORDERED_LIST", "Ordered List")}
        />

        <ToolbarItem
          disabled={isSourceMode}
          isActive={editorState?.isTaskList}
          icon={<ListTodo />}
          onClick={() => editor?.chain()?.focus()?.toggleTaskList()?.run()}
          label={t("TASK_LIST", "Task List")}
        />
      </ResponsiveWrapperToolbarItem>

      <ResponsiveWrapperToolbarItem className="flex justify-center items-center">
        <ToggleGroup
          type="single"
          value={alignValue}
          variant="outline"
          onValueChange={(value) => {
            editor?.chain()?.focus()?.toggleTextAlign(value)?.run();
          }}
          disabled={isSourceMode}
        >
          <Tooltip content={t("ALIGN_LEFT", "Align Left")}>
            <ToggleGroupItem value="left">
              <AlignLeftIcon />
            </ToggleGroupItem>
          </Tooltip>

          <Tooltip content={t("ALIGN_CENTER", "Align Center")}>
            <ToggleGroupItem value="center">
              <AlignCenterIcon />
            </ToggleGroupItem>
          </Tooltip>

          <Tooltip content={t("ALIGN_RIGHT", "Align Right")}>
            <ToggleGroupItem value="right">
              <AlignRightIcon />
            </ToggleGroupItem>
          </Tooltip>

          <Tooltip content={t("ALIGN_JUSTIFY", "Align Justify")}>
            <ToggleGroupItem value="justify">
              <AlignJustifyIcon />
            </ToggleGroupItem>
          </Tooltip>
        </ToggleGroup>
      </ResponsiveWrapperToolbarItem>
    </>
  );
};

const ToolbarLists = memo(ToolbarLists_);
export default ToolbarLists;
