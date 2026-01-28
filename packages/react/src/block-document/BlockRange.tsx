import type { BlockRangeProps } from "./schemas";

import { Range } from "../range";

export function BlockRange(props: BlockRangeProps) {
  return <Range {...props} />;
}

BlockRange.displayName = "@optiaxiom/react/BlockRange";
