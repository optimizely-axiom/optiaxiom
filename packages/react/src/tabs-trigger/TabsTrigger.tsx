import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { useTabsContext } from "../tabs-context";
import * as styles from "./TabsTrigger.css";

type TabsTriggerProps = ButtonProps<typeof RadixTabs.Trigger>;

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    {
      children,
      endDecorator,
      icon,
      iconPosition = "start",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { appearance } = useTabsContext("TabsTrigger");

    const { restProps, sprinkleProps } = extractSprinkles(props);

    return appearance === "primary" ? (
      <Box asChild {...styles.trigger()} {...sprinkleProps}>
        <RadixTabs.Trigger ref={ref} {...restProps}>
          <Flex {...styles.content()}>
            {icon && iconPosition === "start" ? (
              <Box asChild h="auto" w="20">
                {icon}
              </Box>
            ) : (
              startDecorator
            )}

            {children}

            {icon && iconPosition === "end" ? (
              <Box asChild h="auto" w="20">
                {icon}
              </Box>
            ) : (
              endDecorator
            )}
          </Flex>
        </RadixTabs.Trigger>
      </Box>
    ) : (
      <Button
        appearance="secondary"
        asChild
        endDecorator={endDecorator}
        icon={icon}
        iconPosition={iconPosition}
        justifyContent="start"
        ref={ref}
        startDecorator={startDecorator}
        {...sprinkleProps}
      >
        <RadixTabs.Trigger ref={ref} {...restProps}>
          {children}
        </RadixTabs.Trigger>
      </Button>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
