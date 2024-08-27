import { createContext } from "@radix-ui/react-context";

export const [AccordionContextProvider, useAccordionContext] = createContext<{
  appearance: "primary" | "secondary";
}>("Accordion");
