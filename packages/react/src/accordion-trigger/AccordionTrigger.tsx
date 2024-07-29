import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./AccordionTrigger.css";

type AccordionTriggerProps = BoxProps<typeof RadixAccordion.Trigger>;
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <Flex asChild {...styles.wrapper({}, className)} {...sprinkleProps}>
      <RadixAccordion.Trigger {...restProps} ref={ref}>
        {children}
      </RadixAccordion.Trigger>
    </Flex>
  );
});

AccordionTrigger.displayName = "@optiaxiom/react/AccordionTrigger";
