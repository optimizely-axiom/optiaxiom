import { type ReactNode, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import * as styles from "./ButtonGroup.css";

type ButtonGroupProps = BoxProps<
  "div",
  {
    children: ReactNode;
    orientation?: "horizontal" | "vertical";
  }
>;

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { children, className, gap = "0", orientation = "horizontal", ...props },
    ref,
  ) => {
    return (
      <Flex
        data-orientation={gap === "0" ? orientation : undefined}
        flexDirection={orientation === "vertical" ? "column" : "row"}
        gap={gap}
        ref={ref}
        {...styles.buttonGroup({}, className)}
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

ButtonGroup.displayName = "@optiaxiom/react/ButtonGroup";
