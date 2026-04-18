"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

/**
 * Context value shared by ToggleGroup and ToggleGroupItem.
 *
 * @typedef {Object} ToggleGroupContextValue
 * @property {import("@/components/ui/toggle").ToggleVariant} [variant="default"] - Style variant of the toggle group (e.g. "default", "outline").
 * @property {import("@/components/ui/toggle").ToggleSize} [size="default"] - Size of toggle items.
 * @property {number} [spacing=0] - Gap between items in pixels.
 * @property {"horizontal" | "vertical"} [orientation="horizontal"] - Layout direction.
 */

/**
 * Context to share ToggleGroup options (variant, size, spacing, orientation) with its items.
 *
 * @type {React.Context<ToggleGroupContextValue>}
 */
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal",
});

/**
 * High-level toggle group wrapper for mutually exclusive or multi-select toggle buttons.
 *
 * Wraps `radix-ui` ToggleGroup.Root, exposing:
 * - `type="single"` or `type="multiple"` (radio‑like vs checkbox‑like behavior).
 * - Controlled `value` and `onValueChange` (or uncontrolled `defaultValue`).
 * - `orientation="horizontal" | "vertical"` for layout.
 *
 * Use with `ToggleGroupItem` to create a group of buttons that can be toggled on/off.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes for the root element.
 * @param {"single" | "multiple"} [props.type="single"] - Whether the group is single‑select (radio) or multi‑select (checkbox).
 * @param {string | string[] | undefined} [props.value] - Controlled selection value(s). Use `string` for single, `string[]` for multiple.
 * @param {(value: string | string[] | undefined) => void} [props.onValueChange] - Callback when selection changes.
 * @param {string | string[] | undefined} [props.defaultValue] - Initial uncontrolled value(s).
 * @param {import("@/components/ui/toggle").ToggleVariant} [props.variant="default"] - Visual style of the toggle group.
 * @param {import("@/components/ui/toggle").ToggleSize} [props.size="default"] - Size of toggle items.
 * @param {number} [props.spacing=0] - Gap between toggle items in pixels.
 * @param {"horizontal" | "vertical"} [props.orientation="horizontal"] - Layout direction.
 * @param {React.ReactNode} props.children - Toggle group items (ToggleGroupItem).
 * @param {React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>} [props.otherRootProps] - Other props forwarded to the Radix ToggleGroup root.
 * @returns {JSX.Element} A styled toggle group root with context.
 */
function ToggleGroup({
  className,
  type = "single",
  value,
  onValueChange,
  defaultValue,
  variant,
  size,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{
        "--gap": spacing,
      }}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=0]:data-[variant=outline]:shadow-xs data-vertical:flex-col data-vertical:items-stretch",
        className,
      )}
      type={type}
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

/**
 * Individual toggle item inside a ToggleGroup.
 *
 * Consumes context for `variant`, `size`, `spacing`, and `orientation` and passes `value` to Radix.
 * When `type="single"`, only one item can be active at a time. When `type="multiple"`, multiple items can be on.
 *
 * @param {Object} props
 * @param {string} props.value - Unique value of this item, used in `value`/`onValueChange` of ToggleGroup.
 * @param {string} [props.className] - Additional CSS classes for the item.
 * @param {React.ReactNode} props.children - Node to render inside the toggle button.
 * @param {import("@/components/ui/toggle").ToggleVariant} [props.variant] - Variant style; inherits from context if not set.
 * @param {import("@/components/ui/toggle").ToggleSize} [props.size] - Size; inherits from context if not set.
 * @param {boolean} [props.disabled=false] - Whether the item is disabled.
 * @param {React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>} [props.otherItemProps] - Other props forwarded to Radix ToggleGroup.Item.
 * @returns {JSX.Element} A styled toggle group item button.
 */
function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md data-[state=on]:bg-muted group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
