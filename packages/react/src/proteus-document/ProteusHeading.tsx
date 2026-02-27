import { Heading } from "../heading";
import { ProteusElement } from "./ProteusElement";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusHeading({ children, ...props }: Record<string, any>) {
  return (
    <Heading {...props}>
      {children && <ProteusElement element={children} />}
    </Heading>
  );
}

ProteusHeading.displayName = "@optiaxiom/react/ProteusHeading";
