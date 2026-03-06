import { Group } from "../group";
import { ProteusElement } from "./ProteusElement";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusGroup({ children, ...props }: Record<string, any>) {
  return (
    <Group {...useResolvedProteusProps(props)}>
      {children && <ProteusElement element={children} />}
    </Group>
  );
}

ProteusGroup.displayName = "@optiaxiom/react/ProteusGroup";
