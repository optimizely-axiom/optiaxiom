import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { useDisclosureContext } from "../disclosure-context";
import * as styles from "./DisclosureContent.css";

type DisclosureContentProps = ExcludeProps<
  BoxProps<typeof RadixCollapsible.Content>,
  "forceMount"
>;

export const DisclosureContent = forwardRef<
  HTMLDivElement,
  DisclosureContentProps
>(({ children, ...props }, ref) => {
  useDisclosureContext("DisclosureContent");

  return (
    <Box asChild {...styles.content()}>
      <RadixCollapsible.Content>
        <Box p="8" pt="0" ref={ref} {...props}>
          {children}
        </Box>
      </RadixCollapsible.Content>
    </Box>
  );
});

DisclosureContent.displayName = "@optiaxiom/react/DisclosureContent";
