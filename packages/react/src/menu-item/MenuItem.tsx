import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./MenuItem.css";

type MenuItemProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixMenu.Item>,
  {
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  }
>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, className, endDecorator, startDecorator, ...props }, ref) => {
    return (
      <RadixMenu.Item {...props} ref={ref}>
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
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
