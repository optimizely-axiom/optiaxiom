import type { BlockFieldProps } from "./schemas";

import { Field } from "../field";
import { BlockElement } from "./BlockElement";

export function BlockField({ children, ...props }: BlockFieldProps) {
  return (
    <Field {...props}>{children && <BlockElement element={children} />}</Field>
  );
}

BlockField.displayName = "@optiaxiom/react/BlockField";
