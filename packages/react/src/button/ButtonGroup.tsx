import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Group } from "../group";
import * as styles from "./ButtonGroup.css";

export type ButtonGroupProps = BoxProps<
  "div",
  {
    /**
     * The orientation/layout of the buttons inside the group.
     */
    orientation?: "horizontal" | "vertical";
  }
>;

/**
 * @group Button
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { children, className, gap = "0", orientation = "horizontal", ...props },
    ref,
  ) => {
    return (
      <Group
        data-orientation={gap === "0" ? orientation : undefined}
        flexDirection={orientation === "vertical" ? "column" : "row"}
        gap={gap}
        ref={ref}
        {...styles.buttonGroup({}, className)}
        {...props}
      >
        {children}
      </Group>
    );
  },
);

ButtonGroup.displayName = "@optiaxiom/react/ButtonGroup";
