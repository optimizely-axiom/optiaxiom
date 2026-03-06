import { Text } from "../text";
import { ProteusElement } from "./ProteusElement";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusText({ children, ...props }: Record<string, any>) {
  return (
    <Text {...useResolvedProteusProps(props)}>
      {children && <ProteusElement element={children} />}
    </Text>
  );
}

ProteusText.displayName = "@optiaxiom/react/ProteusText";
