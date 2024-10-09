import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

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
    (props, ref) => (
      <svg
        fill={fill}
        height={height}
        ref={ref}
        role="img"
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
