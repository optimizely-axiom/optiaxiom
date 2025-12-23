import type { BlockTextareaElement } from "./types";

import { Textarea } from "../textarea";

export type BlockTextareaProps = Omit<BlockTextareaElement, "$type"> & {
  /**
   * Callback when the textarea value changes
   */
  onChange?: (value: string) => void;
  /**
   * Whether the textarea is read-only
   */
  readOnly?: boolean;
};

export function BlockTextarea({
  name,
  onChange,
  placeholder,
  readOnly,
  rows,
  value,
}: BlockTextareaProps) {
  return (
    <Textarea
      id={name}
      name={name}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      rows={rows}
      value={value || ""}
    />
  );
}

BlockTextarea.displayName = "@optiaxiom/react/BlockTextarea";
