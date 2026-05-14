import { useCallback } from "react";
import { useEditorPropsCtx } from "@/context/EditorPropsCtx";

const useToolbarConfig = () => {
  const { toolbarConfig = {}, readOnly } = useEditorPropsCtx();

  const hiddenGroups = toolbarConfig?.hiddenGroups || [];
  const hiddenItems = toolbarConfig?.hiddenItems || [];

  const checkShowToolbarGroup = useCallback(
    (group) => !readOnly && !hiddenGroups?.includes(group),
    [hiddenGroups, readOnly],
  );

  const checkShowToolbarItem = useCallback(
    (item) => !readOnly && !hiddenItems?.includes(item),
    [hiddenItems, readOnly],
  );

  return {
    checkShowToolbarGroup,
    checkShowToolbarItem,
  };
};

export default useToolbarConfig;
