import { memo } from "react";
import {
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Convenience tooltip wrapper combining Trigger + Content.
 *
 * @typedef {Object} SharedTooltipProps
 * @property {React.ReactNode} children - Element to wrap (trigger).
 * @property {React.ReactNode} content - Tooltip text/content.
 *
 * @param {SharedTooltipProps} props
 * @returns {JSX.Element}
 */
const Tooltip_ = ({ children, content }) => {
  return (
    <TooltipBase>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipBase>
  );
};

const Tooltip = memo(Tooltip_);
export default Tooltip;
