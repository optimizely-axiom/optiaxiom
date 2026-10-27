import { Field, type FieldProps } from "@optiaxiom/react";
import { useCallback, useState } from "react";

import { ProteusFieldProvider } from "./ProteusFieldContext";

export function ProteusField(props: FieldProps) {
  // Keyed by control so a field holding several inputs shows the first
  // failing one, and fixing one input doesn't clear another's error.
  const [errors, setErrors] = useState<Record<string, string>>({});
  const setError = useCallback((id: string, message: string) => {
    setErrors((prev) => {
      if ((prev[id] ?? "") === message) {
        return prev;
      }
      const next = { ...prev };
      if (message) {
        next[id] = message;
      } else {
        delete next[id];
      }
      return next;
    });
  }, []);

  return (
    <ProteusFieldProvider setError={setError}>
      <Field error={Object.values(errors)[0]} {...props} />
    </ProteusFieldProvider>
  );
}

ProteusField.displayName = "@optiaxiom/proteus/ProteusField";
