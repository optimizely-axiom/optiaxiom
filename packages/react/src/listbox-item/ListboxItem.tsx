import { Slot } from "@radix-ui/react-slot";
import { useId } from "@reach/auto-id";
import { type ElementType, forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { Text } from "../text";
import { decorateChildren, type ExtendProps, fallbackSpan } from "../utils";
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
          {decorateChildren({ asChild, children }, (children) => (
            <>
              {addonBefore ? (
                addonBefore
              ) : icon ? (
                <Icon asChild>{icon}</Icon>
              ) : null}

              <Flex flex="1" gap="0">
                <Flex asChild {...styles.title()} id={labelId}>
                  {fallbackSpan(children)}
                </Flex>

                {description && (
                  <Text asChild {...styles.description()} id={descriptionId}>
                    {fallbackSpan(description)}
                  </Text>
                )}
              </Flex>

              {addonAfter && (
                <Box asChild ml="8">
                  {fallbackSpan(addonAfter)}
                </Box>
              )}
            </>
          ))}
        </Comp>
      </Flex>
    );
  },
);

ListboxItem.displayName = "@optiaxiom/react/ListboxItem";
