import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandSub } from "../command-sub";
import { Flex } from "../flex";

type SpotlightSubProps = ComponentPropsWithoutRef<typeof CommandSub>;

export const SpotlightSub = forwardRef<HTMLLIElement, SpotlightSubProps>(
  ({ children, ...props }, ref) => {
    return (
      <CommandSub asChild ref={ref} {...props}>
        <Flex flexDirection="row" gap="xs" pt="sm" px="lg">
          {children}
        </Flex>
      </CommandSub>
    );
  },
);

SpotlightSub.displayName = "@optiaxiom/react/SpotlightSub";
