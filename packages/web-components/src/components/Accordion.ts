import { Accordion as AccordionComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Accordion = "ax-accordion";
register(Accordion, AccordionComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Accordion]: ComponentAttributes<typeof AccordionComponent>;
    }
  }
}
