import type { ProteusGroupProps } from "./schemas";

import { Group } from "../group";
import { ProteusElement } from "./ProteusElement";

export function ProteusGroup({ children, ...props }: ProteusGroupProps) {
  return (
    <Group {...props}>
      {children && <ProteusElement element={children} />}
    </Group>
  );
}

ProteusGroup.displayName = "@optiaxiom/react/ProteusGroup";
