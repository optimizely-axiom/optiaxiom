import { AccordionItem as AccordionItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AccordionItem = "ax-accordion-item";
register(AccordionItem, AccordionItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AccordionItem]: ComponentAttributes<typeof AccordionItemComponent>;
    }
  }
}
