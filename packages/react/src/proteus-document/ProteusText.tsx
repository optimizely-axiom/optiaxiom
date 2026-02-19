import type { ProteusTextProps } from "./schemas";

import { Text } from "../text";
import { ProteusElement } from "./ProteusElement";

export function ProteusText({ children, ...props }: ProteusTextProps) {
  return (
    <Text {...props}>{children && <ProteusElement element={children} />}</Text>
  );
}

ProteusText.displayName = "@optiaxiom/react/ProteusText";
