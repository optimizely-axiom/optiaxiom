import { useEffect, useRef } from "react";

import type { BlockSelectProps } from "./schemas";

import { Select } from "../select";
import { useBlockDocumentContext } from "./BlockDocumentContext";
import { BlockElement } from "./BlockElement";

export function BlockSelect({ children, options, ...props }: BlockSelectProps) {
  const { data, onDataChange, onEvent, readOnly } = useBlockDocumentContext(
    "@optiaxiom/react/BlockSelect",
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
      {children && <BlockElement element={children} />}
    </Select>
  );
}

BlockSelect.displayName = "@optiaxiom/react/BlockSelect";
