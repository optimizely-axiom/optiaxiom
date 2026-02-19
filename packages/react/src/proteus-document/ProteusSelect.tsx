import { useEffect, useRef } from "react";

import type { ProteusSelectProps } from "./schemas";

import { Select } from "../select";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { ProteusElement } from "./ProteusElement";

export function ProteusSelect({
  children,
  options,
  ...props
}: ProteusSelectProps) {
  const { data, onDataChange, onEvent, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusSelect",
  );

  const optionsRef = useRef(options);
  optionsRef.current = options;
  const value = props.name ? data[props.name] : (options[0]?.value ?? "");
  useEffect(() => {
    const option = optionsRef.current.find((option) => option.value === value);
    if (option?.execute) {
      onEvent(option.execute, value);
    }
  }, [onEvent, value]);

  return (
    <Select
      {...props}
      onValueChange={(value) => {
        if (readOnly) {
          return;
        }

        if (props.name) {
          onDataChange?.(props.name, value);
        }
      }}
      options={options}
      value={value}
    >
      {children && <ProteusElement element={children} />}
    </Select>
  );
}

ProteusSelect.displayName = "@optiaxiom/react/ProteusSelect";
