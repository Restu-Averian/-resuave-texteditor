import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

/**
 * @typedef {Object} DropdownMenuBaseProps
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 */

/**
 * Root dropdown menu component wrapping Radix DropdownMenu.Root.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>} props
 * @returns {JSX.Element}
 */
function DropdownMenu({
  ...props
}) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

/**
 * Portal for rendering dropdown outside DOM tree.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>} props
 * @returns {JSX.Element}
 */
function DropdownMenuPortal({
  ...props
}) {
  return (<DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />);
}

/**
 * Dropdown trigger button.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>} props
 * @returns {JSX.Element}
 */
function DropdownMenuTrigger({
  ...props
}) {
  return (<DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />);
}

/**
 * Dropdown content panel.
 *
 * @typedef {Object} DropdownMenuContentProps
 * @property {string} [className]
 * @property {"start" | "center" | "end"} [align="start"]
 * @property {number} [sideOffset=4]
 *
 * @param {DropdownMenuContentProps & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>} props
 * @returns {JSX.Element}
 */
function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props} />
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * Groups related dropdown items together.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>} props
 * @returns {JSX.Element}
 */
function DropdownMenuGroup({
  ...props
}) {
  return (<DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />);
}

/**
 * Individual dropdown menu item.
 *
 * @typedef {Object} DropdownMenuItemProps
 * @property {string} [className]
 * @property {boolean} [inset]
 * @property {"default" | "destructive"} [variant="default"]
 * @property {React.ReactNode} [children]
 *
 * @param {DropdownMenuItemProps & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>} props
 * @returns {JSX.Element}
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props} />
  );
}

/**
 * Dropdown item with checkbox state.
 *
 * @typedef {Object} DropdownMenuCheckboxItemProps
 * @property {string} [className]
 * @property {boolean} [checked]
 * @property {boolean} [inset]
 * @property {React.ReactNode} [children]
 *
 * @param {DropdownMenuCheckboxItemProps & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>} props
 * @returns {JSX.Element}
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}>
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/**
 * Radio group inside a dropdown.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>} props
 * @returns {JSX.Element}
 */
function DropdownMenuRadioGroup({
  ...props
}) {
  return (<DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />);
}

/**
 * Dropdown item with radio state.
 *
 * @typedef {Object} DropdownMenuRadioItemProps
 * @property {string} [className]
 * @property {boolean} [inset]
 * @property {React.ReactNode} [children]
 *
 * @param {DropdownMenuRadioItemProps & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>} props
 * @returns {JSX.Element}
 */
function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}>
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/**
 * Label for grouping items in a dropdown.
 *
 * @typedef {Object} DropdownMenuLabelProps
 * @property {string} [className]
 * @property {boolean} [inset]
 * @property {React.ReactNode} [children]
 *
 * @param {DropdownMenuLabelProps & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>} props
 * @returns {JSX.Element}
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground data-inset:pl-8",
        className
      )}
      {...props} />
  );
}

/**
 * Visual separator between dropdown groups.
 *
 * @param {DropdownMenuBaseProps & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>} props
 * @returns {JSX.Element}
 */
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props} />
  );
}

/**
 * Keyboard shortcut hint text inside a dropdown item.
 *
 * @param {DropdownMenuBaseProps} props
 * @returns {JSX.Element}
 */
function DropdownMenuShortcut({
  className,
  ...props
}) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props} />
  );
}

/**
 * Nested sub-menu root.
 *
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>} props
 * @returns {JSX.Element}
 */
function DropdownMenuSub({
  ...props
}) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

/**
 * Trigger for opening a sub-menu.
 *
 * @typedef {Object} DropdownMenuSubTriggerProps
 * @property {string} [className]
 * @property {boolean} [inset]
 * @property {React.ReactNode} [children]
 *
 * @param {DropdownMenuSubTriggerProps & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>} props
 * @returns {JSX.Element}
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}>
      {children}
      <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/**
 * Content panel for a sub-menu.
 *
 * @param {DropdownMenuBaseProps & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>} props
 * @returns {JSX.Element}
 */
function DropdownMenuSubContent({
  className,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "z-50 min-w-[96px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...props} />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
