import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import * as styles from "./LayoutContent.css";

export type LayoutContentProps = BoxProps<"div">;

/**
 * @group Layout
 */
export const LayoutContent = forwardRef<HTMLDivElement, LayoutContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Group
        ref={ref}
        tabIndex={0}
        {...styles.content({}, className)}
        {...props}
      >
        {children}
      </Group>
    );
  },
);

LayoutContent.displayName = "@optiaxiom/react/LayoutContent";
