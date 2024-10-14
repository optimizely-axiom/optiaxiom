import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./DisclosureContent.css";

type DisclosureContentProps = BoxProps<typeof RadixCollapsible.Content>;

export const DisclosureContent = forwardRef<
  HTMLDivElement,
  DisclosureContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <Box asChild ref={ref} {...styles.content({}, className)} {...props}>
      <RadixCollapsible.Content>
        <Box color="fg.default" fontSize="md" p="xs" pt="0">
          {children}
        </Box>
      </RadixCollapsible.Content>
    </Box>
  );
});

DisclosureContent.displayName = "@optiaxiom/react/DisclosureContent";
