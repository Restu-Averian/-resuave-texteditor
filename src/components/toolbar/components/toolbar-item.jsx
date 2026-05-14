import { Button } from "@/components/ui/button";
import Tooltip from "@/components/ui/shared/tooltip";
import useBreakpoint from "@/hooks/useBreakpoint";
import useToolbarConfig from "@/hooks/useToolbarConfig";
import { cn } from "@/lib/utils";
import React, { memo, useMemo } from "react";

/**
 * A fundamental building block component for every item in the Toolbar.
 * It renders a button that reflects active (isActive) and disabled states.
 *
 * @typedef {Object} ToolbarItemProps
 * @property {boolean} [disabled] - Determines whether the button is disabled and unclickable.
 * @property {boolean} [isActive] - Indicates if the associated format/feature is currently active in the editor. If true, it receives a distinct styling (default variant).
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick - Callback function executed when the button is clicked.
 * @property {React.ReactNode} icon - The icon element (e.g., from lucide-react) displayed inside the button.
 * @property {React.ReactNode | string} label - The descriptive label shown in the tooltip for the toolbar item.
 * @property {boolean} [isPreview=false] - Marks item as part of mobile preview (ghost variant, normal size).
 *
 * @param {ToolbarItemProps} props
 * @returns {JSX.Element} A toolbar button rendered with the appropriate variant.
 */
const ToolbarItem_ = ({
  disabled,
  isActive,
  onClick,
  icon,
  label,
  isPreview = false,
}) => {
  const { xs } = useBreakpoint();
  const { checkDisableToolbarItem } = useToolbarConfig();

  const variantBtn = useMemo(() => {
    const defaultType = xs && isPreview === false ? "secondary" : "ghost";

    if (typeof isActive === "boolean") {
      return isActive ? "default" : defaultType;
    }
    return defaultType;
  }, [isActive, xs, isPreview]);

  return (
    <Tooltip
      content={label}
      {...(xs && {
        open: false,
      })}
    >
      <Button
        className={cn(xs && isPreview === false && "size-16")}
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
