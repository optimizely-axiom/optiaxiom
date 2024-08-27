import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { type Sprinkles, extractSprinkles } from "../sprinkles";

type AccordionProps = BoxProps<
  "div",
  | Omit<RadixAccordion.AccordionMultipleProps, keyof Sprinkles>
  | Omit<RadixAccordion.AccordionSingleProps, keyof Sprinkles>
>;

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ type, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild ref={ref} {...sprinkleProps}>
        {type === "single" ? (
          <RadixAccordion.Root
            type="single"
            {...(restProps as Omit<
              RadixAccordion.AccordionSingleProps,
              "type"
            >)}
          />
        ) : (
          <RadixAccordion.Root
            type="multiple"
            {...(restProps as Omit<
              RadixAccordion.AccordionMultipleProps,
              "type"
            >)}
          />
        )}
      </Box>
    );
  },
);

Accordion.displayName = "@optiaxiom/react/Accordion";
