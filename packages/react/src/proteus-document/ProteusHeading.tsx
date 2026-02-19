import type { ProteusHeadingProps } from "./schemas";

import { Heading } from "../heading";
import { ProteusElement } from "./ProteusElement";

export function ProteusHeading({ children, ...props }: ProteusHeadingProps) {
  return (
    <Heading {...props}>
      {children && <ProteusElement element={children} />}
    </Heading>
  );
}

ProteusHeading.displayName = "@optiaxiom/react/ProteusHeading";
