import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { DisclosureContextProvider } from "../disclosure-context";

type DisclosureProps = BoxProps<
  typeof RadixCollapsible.Root,
  {
    /**
     * The initial open state in uncontrolled mode.
     */
    defaultOpen?: boolean;
    /**
     * Handler that is called when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The open state in controlled mode.
     */
    open?: boolean;
  }
>;

export const Disclosure = forwardRef<HTMLDivElement, DisclosureProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box asChild ref={ref} {...props}>
        <RadixCollapsible.Root>
          <DisclosureContextProvider>{children}</DisclosureContextProvider>
        </RadixCollapsible.Root>
      </Box>
    );
  },
);

Disclosure.displayName = "@optiaxiom/react/Disclosure";
