import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { DisclosureTrigger } from "../disclosure";
import { Text } from "../text";
import { useNavGroupContext } from "./NavGroupContext";

export type NavGroupTriggerProps = ComponentPropsWithoutRef<
  typeof DisclosureTrigger
>;

/**
 * @group Sidebar
 */
export const NavGroupTrigger = forwardRef<HTMLDivElement, NavGroupTriggerProps>(
  ({ children, ...props }, ref) => {
    const { collapsible, id } = useNavGroupContext(
      "@optiaxiom/react/NavGroupTrigger",
    );

    return collapsible ? (
      <DisclosureTrigger
        chevronPosition="end"
        color="fg.tertiary"
        fontSize="sm"
        h="sm"
        id={id}
        mb="4"
        mt="8"
        p="0"
        px="12"
        ref={ref}
        w="auto"
        {...props}
      >
        <Text fontFamily="mono" textTransform="uppercase">
          {children}
        </Text>
      </DisclosureTrigger>
    ) : (
      <Box
        alignItems="center"
        color="fg.tertiary"
        display="flex"
        fontFamily="mono"
        fontSize="sm"
        h="sm"
        id={id}
        mb="4"
        mt="8"
        p="0"
        px="12"
        ref={ref}
        textTransform="uppercase"
        w="auto"
      >
        {children}
      </Box>
    );
  },
);

NavGroupTrigger.displayName = "@optiaxiom/react/NavGroupTrigger";
