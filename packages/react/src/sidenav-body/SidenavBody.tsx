import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type SidenavBodyProps = BoxProps<"ul">;

export const SidenavBody = forwardRef<HTMLUListElement, SidenavBodyProps>(
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

SidenavBody.displayName = "@optiaxiom/react/SidenavBody";
