import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Styled label component built on Radix Label.
 *
 * @typedef {Object} LabelProps
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 *
 * @param {LabelProps & React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props
 * @returns {JSX.Element}
 */
function Label({
  className,
  ...props
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Label }
