import { useRef } from "react";

import { Select } from "../select";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { ProteusElement } from "./ProteusElement";

export function ProteusSelect({
  children,
  options = [],
  ...props
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  name?: string;
  options?: Array<{
    label: string;
    value: string;
  }>;
}) {
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
