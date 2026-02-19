import type { ProteusFieldProps } from "./schemas";

import { Field } from "../field";
import { ProteusElement } from "./ProteusElement";

export function ProteusField({ children, ...props }: ProteusFieldProps) {
  return (
    <Field {...props}>
      {children && <ProteusElement element={children} />}
    </Field>
  );
}

ProteusField.displayName = "@optiaxiom/react/ProteusField";
