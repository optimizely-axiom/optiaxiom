import { Field } from "../field";
import { ProteusElement } from "./ProteusElement";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusField({ children, ...props }: Record<string, any>) {
  return (
    <Field {...useResolvedProteusProps(props)}>
      {children && <ProteusElement element={children} />}
    </Field>
  );
}

ProteusField.displayName = "@optiaxiom/react/ProteusField";
