import * as RadixAccordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type AccordionItemProps = BoxProps<typeof RadixAccordion.Item>;

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, value, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild gap="4" ref={ref} {...sprinkleProps}>
        <RadixAccordion.Item value={value} {...restProps}>
          {children}
        </RadixAccordion.Item>
      </Flex>
    );
  },
);

AccordionItem.displayName = "@optiaxiom/react/AccordionItem";
