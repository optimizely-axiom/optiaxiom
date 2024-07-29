import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Accordion.css";

type AccordionProps = BoxProps<
  typeof RadixAccordion.Root,
  {
    collapsible?: boolean;
  }
>;
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, className, collapsible = true, type, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Flex
        asChild
        ref={ref}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        {type === "single" ? (
          <RadixAccordion.Root
            collapsible={collapsible}
            type="single"
            {...(restProps as Omit<
              RadixAccordion.AccordionSingleProps,
              "type"
            >)}
          >
            {children}
          </RadixAccordion.Root>
        ) : (
          <RadixAccordion.Root
            type="multiple"
            {...(restProps as Omit<
              RadixAccordion.AccordionMultipleProps,
              "type"
            >)}
          >
            {children}
          </RadixAccordion.Root>
        )}
      </Flex>
    );
  },
);

Accordion.displayName = "@optiaxiom/react/Accordion";
