import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./MenuItem.css";

type MenuItemProps = BoxProps<
  typeof RadixMenu.Item,
  {
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  }
>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, endDecorator, startDecorator, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild ref={ref} {...sprinkleProps}>
        <RadixMenu.Item {...restProps}>
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
            <Box flex="1" fontSize="md">
              {children}
            </Box>
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
      </Box>
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
