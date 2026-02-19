import type { ProteusSeparatorProps } from "./schemas";

import { Separator } from "../separator";

export function ProteusSeparator(props: ProteusSeparatorProps) {
  return <Separator {...props} />;
}

ProteusSeparator.displayName = "@optiaxiom/react/ProteusSeparator";
