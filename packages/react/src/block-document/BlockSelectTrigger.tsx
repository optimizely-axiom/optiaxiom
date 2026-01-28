import type { BlockSelectTriggerProps } from "./schemas";

import { SelectTrigger } from "../select";
import { BlockElement } from "./BlockElement";

export function BlockSelectTrigger({
  children,
  ...props
}: BlockSelectTriggerProps) {
  return (
    <SelectTrigger {...props}>
      {children && <BlockElement element={children} />}
    </SelectTrigger>
  );
}

BlockSelectTrigger.displayName = "@optiaxiom/react/BlockSelectTrigger";
