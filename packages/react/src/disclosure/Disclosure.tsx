import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { DisclosureProvider } from "./DisclosureContext";

export type DisclosureProps = BoxProps<
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

/**
 * An interactive component which expands/collapses a panel.
 *
 * @group Disclosure
 * @since 0.1.0
 *
 * @example
 * <Disclosure maxW="sm" w="full">
 *   <DisclosureTrigger>Disclosure label</DisclosureTrigger>
 *   <DisclosureContent>
 *     Aenean neque dui, lobortis et sem quis, mattis varius nisl. Nulla turpis
 *     sapien, venenatis eu pharetra at, ullamcorper sed nibh.
 *   </DisclosureContent>
 * </Disclosure>
 */
export const Disclosure = forwardRef<HTMLDivElement, DisclosureProps>(
  (
    {
      asChild,
      children,
      defaultOpen = false,
      onOpenChange,
      open: openProp,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useControllableState({
      caller: "@optiaxiom/react/Disclosure",
      defaultProp: defaultOpen,
      onChange: onOpenChange,
      prop: openProp,
    });

    return (
      <DisclosureProvider open={open} setOpen={setOpen}>
        <Box asChild color="fg.default" fontSize="md" ref={ref} {...props}>
          <RadixCollapsible.Root
            asChild={asChild}
            onOpenChange={setOpen}
            open={open}
          >
            {children}
          </RadixCollapsible.Root>
        </Box>
      </DisclosureProvider>
    );
  },
);

Disclosure.displayName = "@optiaxiom/react/Disclosure";
