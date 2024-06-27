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
  ComponentPropsWithRef<typeof Button>,
  ComponentPropsWithRef<typeof Flex>,
  {
    children: ReactNode;
    disabled?: boolean;
  } & styles.ButtonGroupVariants
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
      if (isValidElement(child)) {
        return (
          <Box
            asChild
            className={styles.button({ orientation, spacing: gap !== "0" })}
          >
            {cloneElement(
              child as React.ReactElement<ComponentPropsWithRef<typeof Button>>,
              {
                colorScheme: child.props.colorScheme || colorScheme,
                disabled: child.props.disabled || disabled,
                preset: child.props.preset || preset,
                size: child.props.size || size,
                variant: child.props.variant || variant,
              },
            )}
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
