import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { AccordionContextProvider } from "../accordion-context";
import { Box, type BoxProps } from "../box";
import { extractSprinkles, type Sprinkles } from "../sprinkles";

type AccordionProps = BoxProps<
  "div",
  ExtendProps<
    | Omit<RadixAccordion.AccordionMultipleProps, keyof Sprinkles>
    | Omit<RadixAccordion.AccordionSingleProps, keyof Sprinkles>,
    {
      appearance?: "primary" | "secondary";
    }
  >
>;

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ appearance = "primary", type, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <AccordionContextProvider appearance={appearance}>
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
      </AccordionContextProvider>
    );
  },
);

Accordion.displayName = "@optiaxiom/react/Accordion";
