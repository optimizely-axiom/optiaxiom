import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type SidenavHeaderProps = BoxProps<"ul">;

export const SidenavHeader = forwardRef<HTMLUListElement, SidenavHeaderProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild {...sprinkleProps}>
        <ul ref={ref} {...restProps}>
          {children}
        </ul>
      </Flex>
    );
  },
);

SidenavHeader.displayName = "@optiaxiom/react/SidenavHeader";
