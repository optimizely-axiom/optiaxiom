import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type SidenavContentProps = BoxProps<"ul">;

export const SidenavContent = forwardRef<HTMLUListElement, SidenavContentProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        asChild
        flex="1"
        gap="4"
        justifyContent="start"
        overflowX="hidden"
        overflowY="auto"
        py="xs"
        w="full"
        {...sprinkleProps}
      >
        <ul ref={ref} {...restProps}>
          {children}
        </ul>
      </Flex>
    );
  },
);

SidenavContent.displayName = "@optiaxiom/react/SidenavContent";
