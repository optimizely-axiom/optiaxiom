import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { rem } from "../utils";

export const withIcon = (
  {
    fill,
    height = 16,
    name,
    viewBox,
    width = 20,
  }: {
    fill?: "none";
    height?: number;
    name: string;
    viewBox?: string;
    width?: number;
  },
  children: ReactNode,
) => {
  const Icon = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<"svg">>(
    ({ style, ...props }, ref) => (
      <svg
        fill={fill}
        height={height}
        ref={ref}
        style={{
          height: rem(`${height}px`),
          width: rem(`${width}px`),
          ...style,
        }}
        viewBox={viewBox ?? `0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {children}
      </svg>
    ),
  );
  Icon.displayName = `@optiaxiom/react/${name}`;
  return Icon;
};
