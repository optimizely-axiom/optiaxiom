import type { BlockInputElement } from "./types";

import { Input } from "../input";

export type BlockInputProps = Omit<BlockInputElement, "$type"> & {
  /**
   * Callback when the input value changes
   */
  onChange?: (value: string) => void;
  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;
};

export function BlockInput({
  name,
  onChange,
  placeholder,
  readOnly,
  value,
}: BlockInputProps) {
  return (
    <Input
      defaultValue={value || ""}
      id={name}
      name={name}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      size="lg"
    />
  );
}

BlockInput.displayName = "@optiaxiom/react/BlockInput";
