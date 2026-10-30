import { Textarea, type TextareaProps } from "@optiaxiom/react/textarea";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import {
  useProteusValidation,
  type ValidationMessage,
} from "../proteus-field/useProteusValidation";
import { useProteusValue } from "../use-proteus-value";

export type ProteusTextareaProps = TextareaProps & {
  /**
   * Replace the browser's validation message, for any failure or per `ValidityState` flag.
   */
  validationMessage?: ValidationMessage;
};

export function ProteusTextarea({
  validationMessage,
  ...props
}: ProteusTextareaProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusTextarea",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusTextarea",
  );

  const validation = useProteusValidation(props, validationMessage);
  const value = useProteusValue({ path: props.name ?? "" });

  return (
    <Textarea
      {...props}
      {...validation}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(`${parentPath}/${props.name}`, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? String(value ?? "") : undefined}
    />
  );
}

ProteusTextarea.displayName = "@optiaxiom/proteus/ProteusTextarea";
