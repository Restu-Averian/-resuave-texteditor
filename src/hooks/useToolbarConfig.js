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
  const checkDisableToolbarItem = readOnly && readOnlyToolbarMode === "disabled";

  const checkShowToolbarGroup = useCallback(
    (group) => {
      if (!readOnly || readOnlyToolbarMode === "disabled") {
        return !hiddenGroups?.includes(group);
      }
      return false;
    },
    [hiddenGroups, readOnly, readOnlyToolbarMode],
  );

  const checkShowToolbarItem = useCallback(
    (item) => {
      if (!readOnly || readOnlyToolbarMode === "disabled") {
        return !hiddenItems?.includes(item);
      }
      return false;
    },
    [hiddenItems, readOnly, readOnlyToolbarMode],
  );

  return {
    checkDisableToolbarItem,
    checkShowToolbarGroup,
    checkShowToolbarItem,
  };
};

export default useToolbarConfig;
