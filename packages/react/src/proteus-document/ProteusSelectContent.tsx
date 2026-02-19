import type { ProteusSelectContentProps } from "./schemas";

import { SelectContent } from "../select";

export function ProteusSelectContent(props: ProteusSelectContentProps) {
  return <SelectContent {...props} />;
}

ProteusSelectContent.displayName = "@optiaxiom/react/ProteusSelectContent";
