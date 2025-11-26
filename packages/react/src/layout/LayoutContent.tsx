import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./LayoutContent.css";

export type LayoutContentProps = BoxProps<"div">;

/**
 * @group Layout
 */
export const LayoutContent = forwardRef<HTMLDivElement, LayoutContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        tabIndex={0}
        {...styles.content({}, className)}
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

LayoutContent.displayName = "@optiaxiom/react/LayoutContent";
