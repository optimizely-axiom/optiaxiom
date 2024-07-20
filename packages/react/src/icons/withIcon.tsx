import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
} from "react";

export const withIcon = (
  {
    fill,
    height = 16,
    name,
    width = 20,
  }: {
    fill?: "none";
    height?: number;
    name: string;
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
        viewBox={`0 0 ${width} ${height}`}
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
