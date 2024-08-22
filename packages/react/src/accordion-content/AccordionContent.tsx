import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./AccordionContent.css";

type AccordionContentProps = BoxProps<typeof RadixAccordion.Content>;

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <Box asChild ref={ref} {...styles.content({}, className)} {...props}>
      <RadixAccordion.Content>
        <Box color="fg.default" fontSize="md">
          {children}
        </Box>
      </RadixAccordion.Content>
    </Box>
  );
});

AccordionContent.displayName = "@optiaxiom/react/AccordionContent";
