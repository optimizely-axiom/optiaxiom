import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useDisclosureContext } from "../disclosure-context";

type DisclosureContentProps = BoxProps<typeof RadixCollapsible.Content>;

export const DisclosureContent = forwardRef<
  HTMLDivElement,
  DisclosureContentProps
>(({ children, ...props }, ref) => {
  useDisclosureContext("DisclosureContent");

  return (
    <Box asChild ref={ref} {...props}>
      <RadixCollapsible.Content>
        <Box color="fg.default" fontSize="md" p="xs" pt="0">
          {children}
        </Box>
      </RadixCollapsible.Content>
    </Box>
  );
});

DisclosureContent.displayName = "@optiaxiom/react/DisclosureContent";
