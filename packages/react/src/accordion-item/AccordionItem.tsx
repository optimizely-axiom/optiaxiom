import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import * as styles from "./AccordionItem.css";

type AccordionItemProps = BoxProps<typeof RadixAccordion.Item>;
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, value, ...props }, ref) => {
    return (
      <Flex asChild ref={ref} {...styles.wrapper({}, className)} {...props}>
        <RadixAccordion.Item value={value}>{children}</RadixAccordion.Item>
      </Flex>
    );
  },
);

AccordionItem.displayName = "@optiaxiom/react/AccordionItem";
