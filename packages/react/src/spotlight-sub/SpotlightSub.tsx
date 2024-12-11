import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandSub } from "../command-sub";
import { Flex } from "../flex";

type SpotlightSubProps = ComponentPropsWithoutRef<typeof CommandSub>;

export const SpotlightSub = forwardRef<HTMLDivElement, SpotlightSubProps>(
  ({ children, ...props }, ref) => {
    return (
      <CommandSub asChild ref={ref} {...props}>
        <Flex flexDirection="row" gap="8" pt="12" px="24">
          {children}
        </Flex>
      </CommandSub>
    );
  },
);

SpotlightSub.displayName = "@optiaxiom/react/SpotlightSub";
