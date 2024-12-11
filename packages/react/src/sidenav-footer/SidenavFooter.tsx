import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type SidenavFooterProps = BoxProps<"ul">;

export const SidenavFooter = forwardRef<HTMLUListElement, SidenavFooterProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        asChild
        gap="8"
        mt="auto"
        overflowX="hidden"
        py="8"
        {...sprinkleProps}
      >
        <ul ref={ref} {...restProps}>
          {children}
        </ul>
      </Flex>
    );
  },
);

SidenavFooter.displayName = "@optiaxiom/react/SidenavFooter";
