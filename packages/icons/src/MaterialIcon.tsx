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

const sizeMap: Record<string, string> = {
  "2xs": "1rem",
  xs: "1.25rem",
  sm: "1.5rem",
  md: "2rem",
  lg: "2.5rem",
  xl: "3rem",
  "3xl": "5rem",
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
