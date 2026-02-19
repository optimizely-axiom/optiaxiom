import type { ProteusTextareaProps } from "./schemas";

import { Textarea } from "../textarea";
import { useProteusDocumentContext } from "./ProteusDocumentContext";

export function ProteusTextarea({
  onValueChange,
  ...props
}: ProteusTextareaProps) {
  const { data, onDataChange, onEvent, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusTextarea",
  );

  return (
    <Textarea
      {...props}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(props.name, value);
        }
        if (onValueChange) {
          onEvent(onValueChange, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? data[props.name] : undefined}
    />
  );
}

ProteusTextarea.displayName = "@optiaxiom/react/ProteusTextarea";
