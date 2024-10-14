import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type DisclosureProps = BoxProps<typeof RadixCollapsible.Root>;

export const Disclosure = forwardRef<HTMLDivElement, DisclosureProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box asChild ref={ref} {...props}>
        <RadixCollapsible.Root>{children}</RadixCollapsible.Root>
      </Box>
    );
  },
);

Disclosure.displayName = "@optiaxiom/react/Disclosure";
