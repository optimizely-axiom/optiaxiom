import type { BlockTextProps } from "./schemas";

import { Text } from "../text";
import { BlockElement } from "./BlockElement";

export function BlockText({ children, ...props }: BlockTextProps) {
  return (
    <Text {...props}>{children && <BlockElement element={children} />}</Text>
  );
}

BlockText.displayName = "@optiaxiom/react/BlockText";
