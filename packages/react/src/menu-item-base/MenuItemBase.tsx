import { Slot, Slottable } from "@radix-ui/react-slot";
import { useId } from "@reach/auto-id";
import {
  type ElementType,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import { type ExtendProps, fallbackSpan } from "../utils";
import * as styles from "./MenuItemBase.css";

export type MenuItemBaseProps<
  T extends ElementType = "div",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      description?: ReactNode;
      endDecorator?: ReactNode;
      startDecorator?: ReactNode;
    } & styles.ItemVariants,
    P
  >
>;

export const MenuItemBase = forwardRef<HTMLDivElement, MenuItemBaseProps>(
  (
    {
      children,
      className,
      colorScheme = "neutral",
      description,
      endDecorator,
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const labelId = useId();
    const descriptionId = useId();

    const newElement = isValidElement(children) ? children : null;
    children = newElement
      ? cloneElement(
          newElement,
          undefined,
          <Box flex="1">
            <Box asChild id={labelId}>
              {fallbackSpan(newElement.props.children)}
            </Box>

            {description && (
              <Text color="fg.tertiary" fontSize="sm" id={descriptionId}>
                {description}
              </Text>
            )}
          </Box>,
        )
      : children;

    return (
      <Flex
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={labelId}
        asChild
        ref={ref}
        {...styles.item({ colorScheme }, className)}
        {...props}
      >
        <Slot>
          {startDecorator && (
            <Box asChild h="16" w="auto">
              {fallbackSpan(startDecorator)}
            </Box>
          )}

          <Slottable>{children}</Slottable>

          {endDecorator && (
            <Box asChild ml="xs">
              {fallbackSpan(endDecorator)}
            </Box>
          )}
        </Slot>
      </Flex>
    );
  },
);

MenuItemBase.displayName = "@optiaxiom/react/MenuItemBase";
