import type { BlockSelectContentProps } from "./schemas";

import { SelectContent } from "../select";

export function BlockSelectContent(props: BlockSelectContentProps) {
  return <SelectContent {...props} />;
}

BlockSelectContent.displayName = "@optiaxiom/react/BlockSelectContent";
