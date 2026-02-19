import type { BlockSeparatorProps } from "./schemas";

import { Separator } from "../separator";

export function BlockSeparator(props: BlockSeparatorProps) {
  return <Separator {...props} />;
}

BlockSeparator.displayName = "@optiaxiom/react/BlockSeparator";
