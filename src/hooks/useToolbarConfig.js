import { useCallback } from "react";
import { useEditorPropsCtx } from "@/context/EditorPropsCtx";

const useToolbarConfig = () => {
  const {
    toolbarConfig = {},
    readOnly,
    readOnlyToolbarMode,
  } = useEditorPropsCtx();

  const hiddenGroups = toolbarConfig?.hiddenGroups || [];
  const hiddenItems = toolbarConfig?.hiddenItems || [];

  const checkShowToolbarGroup = useCallback(
    (group) => {
      if (readOnlyToolbarMode === "disabled") {
        return !hiddenGroups?.includes(group);
      }
      return !readOnly && !hiddenGroups?.includes(group);
    },
    [hiddenGroups, readOnly, readOnlyToolbarMode],
  );

  const checkShowToolbarItem = useCallback(
    (item) => {
      if (readOnlyToolbarMode === "disabled") {
        return !hiddenItems?.includes(item);
      }
      return !readOnly && !hiddenItems?.includes(item);
    },
    [hiddenItems, readOnly, readOnlyToolbarMode],
  );

  return {
    checkShowToolbarGroup,
    checkShowToolbarItem,
  };
};

export default useToolbarConfig;
