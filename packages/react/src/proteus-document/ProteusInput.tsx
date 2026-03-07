import { Input } from "../input";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
import { useProteusValue } from "./useProteusValue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusInput(props: Record<string, any>) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusInput",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/ProteusInput",
  );

  const value = useProteusValue(props.name ?? "");

  return (
    <Input
      {...props}
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

ProteusInput.displayName = "@optiaxiom/react/ProteusInput";
