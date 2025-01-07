import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./TabsTrigger.css";

type TabsTriggerProps = BoxProps<
  typeof RadixTabs.Trigger,
  {
    /**
     * Display content inside the button after `children`.
     */
    addonAfter?: ReactNode;
    /**
     * Display content inside the button before `children`.
     */
    addonBefore?: ReactNode;
    /**
     * Display an icon before or after the button content.
     */
    icon?: ReactNode;
    /**
     * Control whether to show the icon before or after the button content.
     */
    iconPosition?: "end" | "start";
  }
>;

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    {
      addonAfter,
      addonBefore,
      children,
      className,
      icon,
      iconPosition = "start",
      value,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.trigger({}, className)} {...sprinkleProps}>
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
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
