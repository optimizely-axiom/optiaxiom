import { Text } from "../text";
import { ProteusElement } from "./ProteusElement";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusText({ children, ...props }: Record<string, any>) {
  return (
    <Text {...props}>{children && <ProteusElement element={children} />}</Text>
  );
}

ProteusText.displayName = "@optiaxiom/react/ProteusText";
