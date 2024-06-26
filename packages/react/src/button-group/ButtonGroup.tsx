import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./ButtonGroup.css";

type ButtonGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  {
    children: ReactNode;
  } & styles.ButtonGroupVariants
>;

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { children, className, gap = "0", orientation = "horizontal", ...props },
    ref,
  ) => {
    const mappedChildren = Children.map(children, (child) => (
      <Box
        asChild
        className={styles.button({ orientation, spacing: gap !== "0" })}
      >
        {child}
      </Box>
    ));
    return (
      <Flex
        className={className}
        flexDirection={orientation === "vertical" ? "column" : "row"}
        gap={gap}
        ref={ref}
        {...props}
      >
        {mappedChildren}
      </Flex>
    );
  },
);

ButtonGroup.displayName = "@optiaxiom/react/ButtonGroup";
