import { Input } from "../input";
import { useProteusDocumentContext } from "./ProteusDocumentContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusInput(props: Record<string, any>) {
  const { data, onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusInput",
  );

  return (
    <Input
      {...props}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(props.name, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? data[props.name] : ""}
    />
  );
}

ProteusInput.displayName = "@optiaxiom/react/ProteusInput";
