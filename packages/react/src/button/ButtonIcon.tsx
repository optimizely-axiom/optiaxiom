import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Icon } from "../icon";
import * as styles from "./ButtonIcon.css";

export type ButtonIconProps = BoxProps<"div", NonNullable<styles.IconVariants>>;

export const ButtonIcon = forwardRef<HTMLDivElement, ButtonIconProps>(
  ({ children, className, inverse = false, size = "md", ...props }, ref) => {
    return (
      <Icon
        asChild
        ref={ref}
        {...styles.icon({ inverse, size }, className)}
        {...props}
      >
        {children}
      </Icon>
    );
  },
);

ButtonIcon.displayName = "@optiaxiom/react/ButtonIcon";
