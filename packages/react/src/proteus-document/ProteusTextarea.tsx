import { Textarea } from "../textarea";
import { useProteusDocumentContext } from "./ProteusDocumentContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusTextarea(props: Record<string, any>) {
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
