import { useMemo } from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

/**
 * @typedef {Object} FieldBaseProps
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 */

/**
 * @typedef {"vertical" | "horizontal" | "responsive"} FieldOrientation
 */

/**
 * Root <fieldset> wrapper for grouping fields.
 *
 * @param {FieldBaseProps & React.HTMLAttributes<HTMLFieldSetElement>} props
 * @returns {JSX.Element}
 */
function FieldSet({
  className,
  ...props
}) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props} />
  );
}

/**
 * <legend> inside a FieldSet.
 *
 * @typedef {Object} FieldLegendProps
 * @property {string} [className]
 * @property {"label" | "legend"} [variant="legend"]
 * @property {React.ReactNode} [children]
 *
 * @param {FieldLegendProps & React.HTMLAttributes<HTMLLegendElement>} props
 * @returns {JSX.Element}
 */
function FieldLegend({
  className,
  variant = "legend",
  ...props
}) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      )}
      {...props} />
  );
}

/**
 * Groups multiple Field components together.
 *
 * @param {FieldBaseProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function FieldGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      {...props} />
  );
}

const fieldVariants = cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

/**
 * A single field row with label, content, and error.
 *
 * @typedef {Object} FieldProps
 * @property {string} [className]
 * @property {FieldOrientation} [orientation="vertical"]
 * @property {React.ReactNode} [children]
 *
 * @param {FieldProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props} />
  );
}

/**
 * Content area of a field (input, select, etc.).
 *
 * @param {FieldBaseProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function FieldContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-1 leading-snug", className)}
      {...props} />
  );
}

/**
 * Label for a field, wraps Radix Label.
 *
 * @param {FieldBaseProps & React.ComponentPropsWithoutRef<typeof Label>} props
 * @returns {JSX.Element}
 */
function FieldLabel({
  className,
  ...props
}) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-3 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props} />
  );
}

/**
 * Title text inside a field label area.
 *
 * @param {FieldBaseProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function FieldTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props} />
  );
}

/**
 * Helper description text below a field.
 *
 * @param {FieldBaseProps & React.HTMLAttributes<HTMLParagraphElement>} props
 * @returns {JSX.Element}
 */
function FieldDescription({
  className,
  ...props
}) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props} />
  );
}

/**
 * Visual or labeled separator between fields.
 *
 * @param {FieldBaseProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function FieldSeparator({
  children,
  className,
  ...props
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}>
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content">
          {children}
        </span>
      )}
    </div>
  );
}

/**
 * Displays validation errors for a field.
 *
 * @typedef {Object} FieldErrorProps
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 * @property {{ message?: string }[]} [errors]
 *
 * @param {FieldErrorProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
function FieldError({
  className,
  children,
  errors,
  ...props
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, index) =>
          error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}>
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
