import { Group } from "../group";
import { ProteusElement } from "./ProteusElement";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusGroup({ children, ...props }: Record<string, any>) {
  return (
    <Group {...props}>
      {children && <ProteusElement element={children} />}
    </Group>
  );
}

ProteusGroup.displayName = "@optiaxiom/react/ProteusGroup";
