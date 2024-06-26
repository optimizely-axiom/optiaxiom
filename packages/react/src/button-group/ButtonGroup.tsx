import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Button } from "../button/Button";
import { Flex } from "../flex";
import * as styles from "./ButtonGroup.css";

type ButtonGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  {
    children: ReactNode;
  } & Pick<
    ComponentPropsWithRef<typeof Button>,
    "colorScheme" | "disabled" | "preset" | "size" | "variant"
  > &
    styles.ButtonGroupVariants
>;

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      className,
      colorScheme,
      disabled,
      gap = "0",
      orientation = "horizontal",
      preset,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    const mappedChildren = Children.map(children, (child) => {
      if (isValidElement<ComponentPropsWithRef<typeof Button>>(child)) {
        return (
          <Box
            asChild
            {...styles.button({ orientation, spacing: gap !== "0" })}
          >
            {cloneElement(child, {
              colorScheme: child.props.colorScheme || colorScheme,
              disabled: child.props.disabled || disabled,
              preset: child.props.preset || preset,
              size: child.props.size || size,
              variant: child.props.variant || variant,
            })}
          </Box>
        );
      }
      return child;
    });

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
