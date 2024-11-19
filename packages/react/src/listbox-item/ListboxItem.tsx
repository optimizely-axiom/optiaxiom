import { Slot, Slottable } from "@radix-ui/react-slot";
import { useId } from "@reach/auto-id";
import {
  cloneElement,
  type ElementType,
  forwardRef,
  isValidElement,
  type ReactNode,
} from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { Text } from "../text";
import { type ExtendProps, fallbackSpan } from "../utils";
import * as styles from "./ListboxItem.css";

export type ListboxItemProps<
  T extends ElementType = "div",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      addonAfter?: ReactNode;
      addonBefore?: ReactNode;
      description?: ReactNode;
      icon?: ReactNode;
    } & styles.ItemVariants,
    P
  >
>;

export const ListboxItem = forwardRef<HTMLDivElement, ListboxItemProps>(
  (
    {
      addonAfter,
      addonBefore,
      asChild,
      children,
      className,
      description,
      icon,
      intent = "neutral",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    const labelId = useId();
    const descriptionId = useId();

    if (asChild) {
      const newElement = isValidElement(children) ? children : null;
      children = newElement
        ? cloneElement(
            newElement,
            undefined,
            <Flex flex="1" gap="0">
              <Box asChild {...styles.title()} id={labelId}>
                {fallbackSpan(newElement.props.children)}
              </Box>

              {description && (
                <Text asChild {...styles.description()} id={descriptionId}>
                  {fallbackSpan(description)}
                </Text>
              )}
            </Flex>,
          )
        : children;
    } else {
      children = (
        <Flex flex="1" gap="0">
          <Box asChild {...styles.title()} id={labelId}>
            {fallbackSpan(children)}
          </Box>

          {description && (
            <Text asChild {...styles.description()} id={descriptionId}>
              {fallbackSpan(description)}
            </Text>
          )}
        </Flex>
      );
    }

    return (
      <Flex
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={labelId}
        asChild
        ref={ref}
        {...styles.item({ intent }, className)}
        {...props}
      >
        <Comp>
          {addonBefore ? (
            addonBefore
          ) : icon ? (
            <Icon asChild>{icon}</Icon>
          ) : null}

          <Slottable>{children}</Slottable>

          {addonAfter && (
            <Box asChild ml="xs">
              {fallbackSpan(addonAfter)}
            </Box>
          )}
        </Comp>
      </Flex>
    );
  },
);

ListboxItem.displayName = "@optiaxiom/react/ListboxItem";
