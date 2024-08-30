import { AccordionTrigger as AccordionTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AccordionTrigger = "ax-accordion-trigger";
export default register(AccordionTrigger, AccordionTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AccordionTrigger]: ComponentAttributes<typeof AccordionTriggerComponent>;
    }
  }
}
