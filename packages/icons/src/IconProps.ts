import type { MaterialIconProps } from "@optiaxiom/react/unstable";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type IconProps = ForwardRefExoticComponent<
  Omit<MaterialIconProps, "filledPath" | "unfilledPath"> &
    RefAttributes<SVGSVGElement>
>;
