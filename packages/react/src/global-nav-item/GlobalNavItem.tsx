import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef, useContext } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { GlobalNavContext } from "../global-nav-context";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./GlobalNavItem.css";

export type GlobalNavItemProps = BoxProps<
  typeof Button,
  {
    active?: boolean;
  }
>;

export const GlobalNavItem = forwardRef<HTMLButtonElement, GlobalNavItemProps>(
  ({ active, children, endDecorator, startDecorator, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const { open } = useContext(GlobalNavContext);

    return (
      <Flex
        asChild
        {...styles.item({
          active,
        })}
        {...sprinkleProps}
      >
        <Button
          appearance="secondary"
          icon={startDecorator}
          ref={ref}
          {...restProps}
        >
          {open && (
            <Flex
              asChild
              flexDirection="row"
              justifyContent="space-between"
              w="full"
            >
              <RadixCollapsible.Content>
                {children}
                <Box asChild>{endDecorator}</Box>
              </RadixCollapsible.Content>
            </Flex>
          )}
        </Button>
      </Flex>
    );
  },
);

GlobalNavItem.displayName = "@optiaxiom/react/GlobalNavItem";
