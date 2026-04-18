import { memo, useMemo } from "react";
import { Button } from "../ui/button";
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
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import ToolbarItem from "./components/toolbar-item";

const ToolbarLists_ = () => {
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
      <ToolbarItem
        disabled={isSourceMode}
        icon={<List />}
        onClick={() => editor?.chain()?.focus()?.toggleBulletList()?.run()}
      />

      <ToolbarItem
        disabled={isSourceMode}
        isActive={editorState?.isOrderedList}
        icon={<ListOrdered />}
        onClick={() => editor?.chain()?.focus()?.toggleOrderedList()?.run()}
      />

      <ToolbarItem
        disabled={isSourceMode}
        isActive={editorState?.isTaskList}
        icon={<ListTodo />}
        onClick={() => editor?.chain()?.focus()?.toggleTaskList()?.run()}
      />

      <ToggleGroup
        type="single"
        value={alignValue}
        variant="outline"
        onValueChange={(value) => {
          editor?.chain()?.focus()?.toggleTextAlign(value)?.run();
        }}
        disabled={isSourceMode}
      >
        <ToggleGroupItem value="left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRightIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify">
          <AlignJustifyIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
};

const ToolbarLists = memo(ToolbarLists_);
export default ToolbarLists;
