import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
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
        <Flex flexDirection="row">
          <Flex alignItems="start" flex="1">
            {children}
          </Flex>
          <Flex asChild {...styles.icon()}>
            <IconAngleDown />
          </Flex>
        </Flex>
      </RadixAccordion.Trigger>
    </Flex>
  );
});

AccordionTrigger.displayName = "@optiaxiom/react/AccordionTrigger";
