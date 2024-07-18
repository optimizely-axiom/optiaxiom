import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./MenuItem.css";

type MenuItemProps = BoxProps<
  typeof RadixMenu.Item,
  {
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  }
>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (
    { children, className, disabled, endDecorator, startDecorator, ...props },
    ref,
  ) => {
    return (
      <Flex {...styles.itemRoot()}>
        <RadixMenu.Item disabled={disabled} ref={ref} {...props}>
          <Flex {...styles.item()}>
            {startDecorator && (
              <Box
                asChild
                {...styles.decorator({
                  position: "start",
                })}
              >
                {startDecorator}
              </Box>
            )}
            <Text flex="1" fontSize="md">
              {children}
            </Text>
            {endDecorator && (
              <Box
                asChild
                {...styles.decorator({
                  position: "end",
                })}
              >
                {endDecorator}
              </Box>
            )}
          </Flex>
        </RadixMenu.Item>
      </Flex>
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
