import type { ProteusTextareaProps } from "./schemas";

import { Textarea } from "../textarea";
import { useProteusDocumentContext } from "./ProteusDocumentContext";

export function ProteusTextarea(props: ProteusTextareaProps) {
  const { data, onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusTextarea",
  );

  return (
    <Textarea
      {...props}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(props.name, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? data[props.name] : undefined}
    />
  );
}

ProteusTextarea.displayName = "@optiaxiom/react/ProteusTextarea";
