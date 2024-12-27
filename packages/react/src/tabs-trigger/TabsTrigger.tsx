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
      addonAfter,
      addonBefore,
      children,
      icon,
      iconPosition = "start",
      value,
      ...props
    },
    ref,
  ) => {
    const { appearance } = useTabsContext("TabsTrigger");

    const { restProps, sprinkleProps } = extractSprinkles(props);

    return appearance === "primary" ? (
      <Box asChild {...styles.trigger()} {...sprinkleProps}>
        <RadixTabs.Trigger ref={ref} value={value} {...restProps}>
          <Flex {...styles.content()}>
            {icon && iconPosition === "start" ? (
              <Box asChild h="auto" w="xs">
                {icon}
              </Box>
            ) : (
              addonBefore
            )}

            {children}

            {icon && iconPosition === "end" ? (
              <Box asChild h="auto" w="xs">
                {icon}
              </Box>
            ) : (
              addonAfter
            )}
          </Flex>
        </RadixTabs.Trigger>
      </Box>
    ) : (
      <Button
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        appearance="subtle"
        asChild
        icon={icon}
        iconPosition={iconPosition}
        justifyContent="start"
        ref={ref}
        {...props}
      >
        <RadixTabs.Trigger value={value}>{children}</RadixTabs.Trigger>
      </Button>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
