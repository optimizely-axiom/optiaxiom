import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";
import * as styles from "./MenuItem.css";

type MenuItemProps = BoxProps<
  typeof RadixMenu.Item,
  {
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  } & styles.ItemVariants
>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      children,
      colorScheme = "neutral",
      endDecorator,
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        asChild
        ref={ref}
        {...styles.item({ colorScheme })}
        {...sprinkleProps}
      >
        <RadixMenu.Item {...restProps}>
          {startDecorator && (
            <Box asChild h="16" w="auto">
              {fallbackSpan(startDecorator)}
            </Box>
          )}

          <Box flex="1">{children}</Box>

          {endDecorator && (
            <Box asChild ml="xs">
              {fallbackSpan(endDecorator)}
            </Box>
          )}
        </RadixMenu.Item>
      </Flex>
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
