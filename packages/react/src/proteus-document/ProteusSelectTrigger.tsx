import { SelectTrigger } from "../select";
import { ProteusElement } from "./ProteusElement";

export function ProteusSelectTrigger({
  children,
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Record<string, any>) {
  return (
    <SelectTrigger {...props}>
      {children && <ProteusElement element={children} />}
    </SelectTrigger>
  );
}

ProteusSelectTrigger.displayName = "@optiaxiom/react/ProteusSelectTrigger";
