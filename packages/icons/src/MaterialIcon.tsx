import { type ComponentPropsWithoutRef, forwardRef } from "react";

import "./MaterialIcon.css";

const ICON_CLASSNAME = "_9939fd78";

export type MaterialIconProps = Omit<
  ComponentPropsWithoutRef<"svg">,
  "height" | "width"
> & {
  /**
   * Whether the icon should use filled or unfilled state.
   */
  filled?: boolean;
  /**
   * The path for the filled icon.
   */
  filledPath?: string;
  /**
   * Set the icon size using design tokens (`sm`, `md`, `lg`, etc.), pixel string values (`"16"`, `"20"`), or numeric pixel values (`16`, `20`).
   */
  size?: number | string;
  /**
   * The path for the unfilled icon.
   */
  unfilledPath: string;
};

/**
 * Falls back to `1rem` since icons can render without the react ThemeProvider
 * that defines `--ax-styles-scale`.
 */
const rem = (px: `${number}px`) =>
  `calc(${parseFloat(px) / 16} * var(--ax-styles-scale, 1rem))`;

const sizeMap: Record<string, string> = {
  "2xs": rem("16px"),
  xs: rem("20px"),
  sm: rem("24px"),
  md: rem("32px"),
  lg: rem("40px"),
  xl: rem("48px"),
  "3xl": rem("80px"),
};

function resolveSize(size: number | string) {
  if (typeof size === "number") {
    return `${size}px`;
  }
  return sizeMap[size] ?? size;
}

export const MaterialIcon = forwardRef<SVGSVGElement, MaterialIconProps>(
  (
    {
      className,
      filled = false,
      filledPath,
      size,
      style,
      unfilledPath,
      ...props
    },
    ref,
  ) => {
    const resolved = size !== undefined ? resolveSize(size) : undefined;

    return (
      <svg
        className={
          className ? `${ICON_CLASSNAME} ${className}` : ICON_CLASSNAME
        }
        ref={ref}
        style={{
          ...(resolved && { height: resolved, width: resolved }),
          ...style,
        }}
        viewBox="0 -960 960 960"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {!filledPath || unfilledPath === filledPath ? (
          <path d={unfilledPath} />
        ) : (
          <>
            <path
              d={unfilledPath}
              style={{
                clipPath: filled
                  ? "polygon(0 100%, 0 100%, 0 100%)"
                  : "polygon(0 -100%, 200% 100%, 0 100%)",
                transition: "clip-path 250ms",
              }}
            />
            <path
              d={filledPath}
              style={{
                clipPath: filled
                  ? "polygon(-100% 0, 100% 200%, 100% 0)"
                  : "polygon(100% 0, 100% 0, 100% 0)",
                transition: "clip-path 250ms",
              }}
            />
          </>
        )}
      </svg>
    );
  },
);

MaterialIcon.displayName = "@optiaxiom/icons/MaterialIcon";
