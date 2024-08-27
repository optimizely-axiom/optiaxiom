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
    appearance?: "primary" | "secondary";
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  }
>;

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(
  (
    {
      appearance = "primary",
      children,
      endDecorator,
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const startIcon =
      startDecorator ||
      (appearance === "primary" && !endDecorator && <IconAngleRight />);
    const endIcon =
      endDecorator || (appearance === "secondary" && <IconAngleDown />);

    return (
      <Flex asChild {...styles.trigger()} {...sprinkleProps}>
        <RadixAccordion.Trigger ref={ref} {...restProps}>
          {startIcon && (
            <Box asChild {...styles.icon({ appearance: "primary" })}>
              {startIcon}
            </Box>
          )}
          <Box flex="1">{children}</Box>
          {endIcon && (
            <Box asChild {...styles.icon({ appearance: "secondary" })}>
              {endIcon}
            </Box>
          )}
        </RadixAccordion.Trigger>
      </Flex>
    );
  },
);

AccordionTrigger.displayName = "@optiaxiom/react/AccordionTrigger";
