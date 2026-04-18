import { memo } from "react";
import {
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
