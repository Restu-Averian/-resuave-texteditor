import { useCallback, useMemo } from "react";
import { useEditorPropsCtx } from "@/context/EditorPropsCtx";

const useToolbarConfig = () => {
  const {
    toolbarConfig = {},
    readOnly,
    readOnlyToolbarMode,
  } = useEditorPropsCtx();

  const hiddenGroups = toolbarConfig?.hiddenGroups || [];
  const hiddenItems = toolbarConfig?.hiddenItems || [];

  const checkDisableToolbarItem = useMemo(
    () => readOnly && readOnlyToolbarMode === "disabled",
    [readOnly, readOnlyToolbarMode],
  );

  const checkShowToolbarGroup = useCallback(
    /** @param {import("@/types").TToolbarGroup} group  */
    (group) => {
      if (!readOnly || readOnlyToolbarMode === "disabled") {
        return !hiddenGroups?.includes(group);
      }
      return false;
    },
    [hiddenGroups, readOnly, readOnlyToolbarMode],
  );

  const checkShowToolbarItem = useCallback(
    /** @param {import("@/types").TToolbarItem} item  */
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
