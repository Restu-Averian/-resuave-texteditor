import useBreakpoint from "@/hooks/useBreakpoint";
import { Fragment, memo } from "react";

/**
 * Responsive wrapper for toolbar items.
 *
 * - On mobile (`xs`), wraps the children in a `<div>` and forwards all props
 *   (className, onClick, etc.) to that element.
 * - On larger viewports, renders the children inside `React.Fragment` so no
 *   extra DOM node is added.
 *
 * @typedef {Object} ResponsiveWrapperToolbarItemProps
 * @property {boolean} [isPreview=false] - Marks item as mobile preview; renders as Fragment (no interactive wrapper).
 * @property {React.ReactNode} [children]
 *
 * @param {ResponsiveWrapperToolbarItemProps & React.HTMLAttributes<HTMLDivElement>} props
 *   Props that will be forwarded to the `div` when rendered on mobile.
 */
const ResponsiveWrapperToolbarItem_ = ({
  children,
  isPreview = false,
  ...props
}) => {
  const { xs } = useBreakpoint();

  if (xs && isPreview === false) {
    return <div {...props}>{children}</div>;
  }
  return <Fragment>{children}</Fragment>;
};

const ResponsiveWrapperToolbarItem = memo(ResponsiveWrapperToolbarItem_);
export default ResponsiveWrapperToolbarItem;
