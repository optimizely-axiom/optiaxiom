import { AccordionContent as AccordionContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AccordionContent = "ax-accordion-content";
export default register(AccordionContent, AccordionContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AccordionContent]: ComponentAttributes<typeof AccordionContentComponent>;
    }
  }
}
