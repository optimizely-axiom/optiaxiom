import type { BlockGroupProps } from "./schemas";

import { Group } from "../group";
import { BlockElement } from "./BlockElement";

export function BlockGroup({ children, ...props }: BlockGroupProps) {
  return (
    <Group {...props}>{children && <BlockElement element={children} />}</Group>
  );
}

BlockGroup.displayName = "@optiaxiom/react/BlockGroup";
