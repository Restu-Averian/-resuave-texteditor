import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * @typedef {Object} PopoverBaseProps
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 */

/**
 * Root popover component wrapping Radix Popover.Root.
 *
 * @param {React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>} props
 * @returns {JSX.Element}
 */
function Popover({
  ...props
}) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/**
 * Trigger button that opens the popover.
 *
 * @param {React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>} props
 * @returns {JSX.Element}
 */
function PopoverTrigger({
  ...props
}) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/**
 * Popover content panel.
 *
 * @typedef {Object} PopoverContentProps
 * @property {string} [className]
 * @property {"start" | "center" | "end"} [align="center"]
 * @property {number} [sideOffset=4]
 *
 * @param {PopoverContentProps & React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>} props
 * @returns {JSX.Element}
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-4 rounded-md bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props} />
    </PopoverPrimitive.Portal>
  );
}

/**
 * Anchor element for positioning the popover.
 *
 * @param {React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>} props
 * @returns {JSX.Element}
 */
function PopoverAnchor({
  ...props
}) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

/**
 * Header section inside the popover content.
 *
 * @param {PopoverBaseProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function PopoverHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props} />
  );
}

/**
 * Title text inside the popover header.
 *
 * @param {PopoverBaseProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function PopoverTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-heading font-medium", className)}
      {...props} />
  );
}

/**
 * Description text inside popover content.
 *
 * @param {PopoverBaseProps & React.HTMLAttributes<HTMLParagraphElement>} props
 * @returns {JSX.Element}
 */
function PopoverDescription({
  className,
  ...props
}) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props} />
  );
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
