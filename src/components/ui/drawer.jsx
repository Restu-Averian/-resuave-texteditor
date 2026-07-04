import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

/**
 * Root Drawer component wrapping Vaul Drawer.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>} props
 * @returns {JSX.Element}
 */
function Drawer({ ...props }) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

/**
 * Drawer trigger button to open the drawer.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>} props
 * @returns {JSX.Element}
 */
function DrawerTrigger({ ...props }) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

/**
 * Portal for rendering Drawer content outside DOM hierarchy.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>} props
 * @returns {JSX.Element}
 */
function DrawerPortal({ ...props }) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

/**
 * Close button for the drawer.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>} props
 * @returns {JSX.Element}
 */
function DrawerClose({ ...props }) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

/**
 * Darkened overlay behind the drawer.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>} props
 * @returns {JSX.Element}
 */
function DrawerOverlay({ className, ...props }) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * The main drawer content panel.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>} props
 * @returns {JSX.Element}
 */
function DrawerContent({ className, children, ...props }) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-popover text-sm text-popover-foreground data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-1.5 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

/**
 * Header section of the drawer.
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function DrawerHeader({ className, ...props }) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Footer section of the drawer.
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function DrawerFooter({ className, ...props }) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

/**
 * Title component for the drawer.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>} props
 * @returns {JSX.Element}
 */
function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-heading font-medium text-foreground", className)}
      {...props}
    />
  );
}

/**
 * Description text for the drawer.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>} props
 * @returns {JSX.Element}
 */
function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
