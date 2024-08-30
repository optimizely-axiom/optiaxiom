import { AxiomProvider as AxiomProviderComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AxiomProvider = "ax-axiom-provider";
export default register(AxiomProvider, AxiomProviderComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AxiomProvider]: ComponentAttributes<typeof AxiomProviderComponent>;
    }
  }
}
