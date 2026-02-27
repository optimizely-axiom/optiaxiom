import { Textarea } from "../textarea";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
import { useProteusValue } from "./useProteusValue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusTextarea(props: Record<string, any>) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusTextarea",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/ProteusTextarea",
  );

  const value = useProteusValue(props.name ?? "");

  return (
    <Textarea
      {...props}
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

ProteusTextarea.displayName = "@optiaxiom/react/ProteusTextarea";
