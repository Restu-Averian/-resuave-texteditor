"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Visual divider line.
 *
 * @typedef {Object} SeparatorProps
 * @property {string} [className]
 * @property {"horizontal" | "vertical"} [orientation="horizontal"]
 * @property {boolean} [decorative=true]
 *
 * @param {SeparatorProps & React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props
 * @returns {JSX.Element}
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props} />
  );
}

export { Separator }
