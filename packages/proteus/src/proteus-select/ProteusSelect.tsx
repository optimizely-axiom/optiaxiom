import { Select, type SelectProps } from "@optiaxiom/react";
import { useRef } from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../proteus-document/useProteusValue";

export type ProteusSelectProps = Omit<SelectProps, "options"> & {
  /**
   * The select items/options we want to render.
   */
  options?: Array<{
    /**
     * String representation of items
     */
    label: string;
    /**
     * Return a unique key for each item
     */
    value: string;
  }>;
};

export function ProteusSelect({
  children,
  options = [],
  ...props
}: ProteusSelectProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusSelect",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusSelect",
  );

  const optionsRef = useRef(options);
  optionsRef.current = options;
  const resolved = useProteusValue({ path: props.name ?? "" });
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
      {children}
    </Select>
  );
}

ProteusSelect.displayName = "@optiaxiom/proteus/ProteusSelect";
