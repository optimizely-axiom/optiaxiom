import type { BlockHeadingProps } from "./schemas";

import { Heading } from "../heading";
import { BlockElement } from "./BlockElement";

export function BlockHeading({ children, ...props }: BlockHeadingProps) {
  return (
    <Heading {...props}>
      {children && <BlockElement element={children} />}
    </Heading>
  );
}

BlockHeading.displayName = "@optiaxiom/react/BlockHeading";
