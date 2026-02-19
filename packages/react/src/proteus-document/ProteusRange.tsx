import type { ProteusRangeProps } from "./schemas";

import { Range } from "../range";

export function ProteusRange(props: ProteusRangeProps) {
  return <Range {...props} />;
}

ProteusRange.displayName = "@optiaxiom/react/ProteusRange";
