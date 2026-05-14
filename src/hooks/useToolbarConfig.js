import { useCallback, useMemo } from "react";
import { useEditorPropsCtx } from "@/context/EditorPropsCtx";

const useToolbarConfig = () => {
  const { disabledFeatures = [], toolbarConfig = {}, readOnly } =
    useEditorPropsCtx();

  const hiddenGroups = toolbarConfig?.hiddenGroups || [];
  const hiddenItems = useMemo(
    () => [...(toolbarConfig?.hiddenItems || []), ...disabledFeatures],
    [disabledFeatures, toolbarConfig?.hiddenItems],
  );

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
