import * as RadixAccordion from "@radix-ui/react-accordion";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { IconAngleRight } from "../icons/IconAngleRight";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./AccordionTrigger.css";

type AccordionTriggerProps = BoxProps<
  typeof RadixAccordion.Trigger,
  {
    chevron?: "end" | "start";
    endDecorator?: ReactNode;
  }
>;

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ chevron = "start", children, endDecorator, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <Flex asChild {...styles.trigger()} {...sprinkleProps}>
      <RadixAccordion.Trigger ref={ref} {...restProps}>
        {chevron === "start" && (
          <Box asChild {...styles.icon({ chevron })}>
            {endDecorator ?? <IconAngleRight />}
          </Box>
        )}
        <Box flex="1">{children}</Box>
        {chevron === "end" && (
          <Box asChild {...styles.icon({ chevron })}>
            {endDecorator ?? <IconAngleDown />}
          </Box>
        )}
      </RadixAccordion.Trigger>
    </Flex>
  );
});

AccordionTrigger.displayName = "@optiaxiom/react/AccordionTrigger";
