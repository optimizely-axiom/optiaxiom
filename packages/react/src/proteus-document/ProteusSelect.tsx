import { useRef } from "react";

import { Select } from "../select";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
import { ProteusElement } from "./ProteusElement";
import { useProteusValue } from "./useProteusValue";

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
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusSelect",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/ProteusSelect",
  );

  const optionsRef = useRef(options);
  optionsRef.current = options;
  const resolved = useProteusValue(props.name ?? "");
  const value = props.name
    ? String(resolved ?? options[0]?.value ?? "")
    : (options[0]?.value ?? "");

  return (
    <Select
      {...props}
      onValueChange={(value) => {
        if (readOnly) {
          return;
        }

        if (props.name) {
          onDataChange?.(`${parentPath}/${props.name}`, value);
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
