import { Input, type InputProps } from "@optiaxiom/react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import {
  useProteusValidation,
  type ValidationMessage,
} from "../proteus-field/useProteusValidation";
import { useProteusValue } from "../use-proteus-value";

export type ProteusInputProps = InputProps & {
  /**
   * Replace the browser's validation message, for any failure or per `ValidityState` flag.
   */
  validationMessage?: ValidationMessage;
};

export function ProteusInput({
  validationMessage,
  ...props
}: ProteusInputProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusInput",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusInput",
  );

  const validation = useProteusValidation(props, validationMessage);
  const value = useProteusValue({ path: props.name ?? "" });
  const writePath = props.name ? `${parentPath}/${props.name}` : parentPath;

  return (
    <Input
      {...props}
      {...validation}
      onValueChange={(value) => {
        if (writePath) {
          onDataChange?.(writePath, value);
        }
      }}
      readOnly={readOnly}
      value={String(value ?? "")}
    />
  );
}

ProteusInput.displayName = "@optiaxiom/proteus/ProteusInput";
