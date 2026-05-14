import { Button } from "@/components/ui/button";
import Tooltip from "@/components/ui/shared/tooltip";
import useBreakpoint from "@/hooks/useBreakpoint";
import useToolbarConfig from "@/hooks/useToolbarConfig";
import React, { memo, useMemo } from "react";

/**
 * A fundamental building block component for every item in the Toolbar.
 * It renders a button that reflects active (isActive) and disabled states.
 *
 * @param {Object} props - Props for ToolbarItem.
 * @param {boolean} [props.disabled] - Determines whether the button is disabled and unclickable.
 * @param {boolean} [props.isActive] - Indicates if the associated format/feature is currently active in the editor. If true, it receives a distinct styling (default variant).
 * @param {React.MouseEventHandler<HTMLButtonElement>} props.onClick - Callback function executed when the button is clicked.
 * @param {React.ReactNode} props.icon - The icon element (e.g., from lucide-react) displayed inside the button.
 * @param {React.ReactNode | string} props.label - The descriptive label shown in the tooltip for the toolbar item.
 * @returns {JSX.Element} A toolbar button rendered with the appropriate variant.
 */
const ToolbarItem_ = ({ disabled, isActive, onClick, icon, label }) => {
  const { xs } = useBreakpoint();
  const { checkDisableToolbarItem } = useToolbarConfig();

  const variantBtn = useMemo(() => {
    if (typeof isActive === "boolean") {
      return isActive ? "default" : "ghost";
    }
    return "ghost";
  }, [isActive]);

  return (
    <Tooltip
      content={label}
      {...(xs && {
        open: false,
      })}
    >
      <Button
        variant={variantBtn}
        disabled={disabled || checkDisableToolbarItem}
        onClick={onClick}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

const ToolbarItem = memo(ToolbarItem_);
export default ToolbarItem;
