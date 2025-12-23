import type { ReactNode } from "react";

import type { BlockFieldElement } from "./types";

import { Field } from "../field";

export type BlockFieldProps = Omit<BlockFieldElement, "$type" | "children"> & {
  /**
   * Form field child elements (typically Block.Input or Block.Textarea)
   */
  children: ReactNode;
  /**
   * ID of the input element within this field (for label association)
   */
  inputId?: string;
};

export function BlockField({
  children,
  description,
  error,
  info,
  inputId,
  label,
  required,
}: BlockFieldProps) {
  return (
    <Field
      description={description}
      error={error}
      info={info}
      inputId={inputId}
      label={label}
      required={required}
      w="full"
    >
      {children}
    </Field>
  );
}

BlockField.displayName = "@optiaxiom/react/BlockField";
