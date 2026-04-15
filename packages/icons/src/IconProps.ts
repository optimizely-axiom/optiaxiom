import type { ForwardRefExoticComponent, RefAttributes } from "react";

import type { MaterialIconProps } from "./MaterialIcon";

export type IconProps = ForwardRefExoticComponent<
  Omit<MaterialIconProps, "filledPath" | "unfilledPath"> &
    RefAttributes<SVGSVGElement>
>;
