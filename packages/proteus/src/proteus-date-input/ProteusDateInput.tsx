import { DateInput, type DateInputProps } from "@optiaxiom/react/date-input";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import {
  useProteusValidation,
  type ValidationMessage,
} from "../proteus-field/useProteusValidation";
import { useProteusValue } from "../use-proteus-value";

export type ProteusDateInputProps = DateInputProps & {
  /**
   * Replace the browser's validation message, for any failure or per `ValidityState` flag.
   */
  validationMessage?: ValidationMessage;
};

export function ProteusDateInput({
  validationMessage,
  ...props
}: ProteusDateInputProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusDateInput",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusDateInput",
  );

  const validation = useProteusValidation(props, validationMessage);
  const value = useProteusValue({ path: props.name ?? "" });

  return (
    <DateInput
      {...props}
      {...validation}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(`${parentPath}/${props.name}`, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? String(value ?? "") : ""}
    />
  );
}

ProteusDateInput.displayName = "@optiaxiom/proteus/ProteusDateInput";
