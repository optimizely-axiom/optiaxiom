import clsx from "clsx";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import {
  type ButtonGroupVariants,
  buttonGroup,
  parentButtonGroup as parent,
} from "./ButtonGroup.css";

type ButtonGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  {
    children: ReactNode;
  } & ButtonGroupVariants
>;

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { children, className, gap = "0", orientation = "horizontal", ...props },
    ref,
  ) => {
    const mappedChildren = Children.map(children, (child) => (
      <Box
        asChild
        className={clsx(buttonGroup({ orientation, spacing: gap !== "0" }))}
      >
        {child}
      </Box>
    ));
    return (
      <Flex
        className={clsx(parent({ orientation }), className)}
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
