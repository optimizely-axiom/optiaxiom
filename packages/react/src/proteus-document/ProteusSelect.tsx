import { useRef } from "react";

import type { ProteusSelectProps } from "./schemas";

import { Select } from "../select";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { ProteusElement } from "./ProteusElement";

export function ProteusSelect({
  children,
  options,
  ...props
}: ProteusSelectProps) {
  const { data, onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusSelect",
  );

  const optionsRef = useRef(options);
  optionsRef.current = options;
  const value = props.name ? data[props.name] : (options[0]?.value ?? "");

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
