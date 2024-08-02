import * as RadixAccordion from "@radix-ui/react-accordion";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./AccordionTrigger.css";

type AccordionTriggerProps = BoxProps<
  typeof RadixAccordion.Trigger,
  {
    endDecorator?: ReactNode;
  }
>;

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, endDecorator, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <Flex
      asChild
      color="fg.default"
      flexDirection="row"
      fontSize="lg"
      fontWeight="600"
      py="sm"
      textAlign="start"
      w="full"
      {...sprinkleProps}
    >
      <RadixAccordion.Trigger ref={ref} {...restProps}>
        <Box flex="1">{children}</Box>

        <Box asChild {...styles.icon()}>
          {endDecorator ?? <IconAngleDown />}
        </Box>
      </RadixAccordion.Trigger>
    </Flex>
  );
});

AccordionTrigger.displayName = "@optiaxiom/react/AccordionTrigger";
