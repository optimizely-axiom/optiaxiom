import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type AccordionItemProps = BoxProps<typeof RadixAccordion.Item>;

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, value, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild ref={ref} {...sprinkleProps}>
        <RadixAccordion.Item value={value} {...restProps}>
          {children}
        </RadixAccordion.Item>
      </Box>
    );
  },
);

AccordionItem.displayName = "@optiaxiom/react/AccordionItem";
