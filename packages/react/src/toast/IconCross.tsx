import { type ComponentPropsWithRef, forwardRef } from "react";

export const IconCross = forwardRef<
  SVGSVGElement,
  ComponentPropsWithRef<"svg">
>(({ ...props }, ref) => (
  <svg
    height="11"
    ref={ref}
    viewBox="0 0 11 11"
    width="11"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.8437 9.875C10.6562 10.0625 10.3124 10.0625 10.1249 9.875L5.99994 5.71875L1.84369 9.875C1.65619 10.0625 1.31244 10.0625 1.12494 9.875C0.937439 9.6875 0.937439 9.34375 1.12494 9.15625L5.28119 5L1.12494 0.875C0.937439 0.6875 0.937439 0.34375 1.12494 0.15625C1.31244 -0.03125 1.65619 -0.03125 1.84369 0.15625L5.99994 4.3125L10.1249 0.15625C10.3124 -0.03125 10.6562 -0.03125 10.8437 0.15625C11.0312 0.34375 11.0312 0.6875 10.8437 0.875L6.68744 5L10.8437 9.15625C11.0312 9.34375 11.0312 9.6875 10.8437 9.875Z"
      fill="currentColor"
    />
  </svg>
));
IconCross.displayName = "@optiaxiom/react/IconCross";
