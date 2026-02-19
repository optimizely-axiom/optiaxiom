import type { ProteusSelectTriggerProps } from "./schemas";

import { SelectTrigger } from "../select";
import { ProteusElement } from "./ProteusElement";

export function ProteusSelectTrigger({
  children,
  ...props
}: ProteusSelectTriggerProps) {
  return (
    <SelectTrigger {...props}>
      {children && <ProteusElement element={children} />}
    </SelectTrigger>
  );
}

ProteusSelectTrigger.displayName = "@optiaxiom/react/ProteusSelectTrigger";
