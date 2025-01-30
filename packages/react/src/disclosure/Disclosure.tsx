import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
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
  ({ children, defaultOpen, onOpenChange, open: openProp, ...props }, ref) => {
    const [open, setOpen] = useControllableState({
      defaultProp: defaultOpen,
      onChange: onOpenChange,
      prop: openProp,
    });

    return (
      <Box asChild color="fg.default" fontSize="md" ref={ref} {...props}>
        <RadixCollapsible.Root onOpenChange={setOpen} open={open}>
          <DisclosureContextProvider open={open}>
            {children}
          </DisclosureContextProvider>
        </RadixCollapsible.Root>
      </Box>
    );
  },
);

Disclosure.displayName = "@optiaxiom/react/Disclosure";
