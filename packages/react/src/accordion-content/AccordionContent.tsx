import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { AnimatePresence } from "../animate-presence";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { Transition } from "../transition";
import * as styles from "./AccordionContent.css";

type AccordionContentProps = BoxProps<typeof RadixAccordion.Content>;
export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <AnimatePresence>
      <Transition duration="sm">
        <Flex
          asChild
          ref={ref}
          {...styles.wrapper({}, className)}
          {...sprinkleProps}
        >
          <RadixAccordion.Content {...restProps}>
            {children}
          </RadixAccordion.Content>
        </Flex>
      </Transition>
    </AnimatePresence>
  );
});

AccordionContent.displayName = "@optiaxiom/react/AccordionContent";
