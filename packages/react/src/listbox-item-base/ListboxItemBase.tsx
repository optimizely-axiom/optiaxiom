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
import { type ExtendProps } from "../utils";
import * as styles from "./ListboxItemBase.css";

export type ListboxItemBaseProps<
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

export const ListboxItemBase = forwardRef<HTMLDivElement, ListboxItemBaseProps>(
  (
    {
      addonAfter,
      addonBefore,
      children,
      className,
      colorScheme = "neutral",
      description,
      icon,
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
          <Flex flex="1" gap="0">
            <Box {...styles.title()} id={labelId}>
              {newElement.props.children}
            </Box>

            {description && (
              <Text {...styles.description()} id={descriptionId}>
                {description}
              </Text>
            )}
          </Flex>,
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
          {addonBefore ? (
            addonBefore
          ) : icon ? (
            <Icon asChild>{icon}</Icon>
          ) : null}

          <Slottable>{children}</Slottable>

          {addonAfter && <Box ml="xs">{addonAfter}</Box>}
        </Slot>
      </Flex>
    );
  },
);

ListboxItemBase.displayName = "@optiaxiom/react/ListboxItemBase";
