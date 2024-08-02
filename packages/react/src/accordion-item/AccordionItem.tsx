import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type AccordionItemProps = BoxProps<typeof RadixAccordion.Item>;

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, value, ...props }, ref) => {
    return (
      <Box asChild borderT="1" ref={ref} {...props}>
        <RadixAccordion.Item value={value}>{children}</RadixAccordion.Item>
      </Box>
    );
  },
);

AccordionItem.displayName = "@optiaxiom/react/AccordionItem";
