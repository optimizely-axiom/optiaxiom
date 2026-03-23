import { Switch, type SwitchProps } from "@optiaxiom/react";
import { useEffect } from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export function ProteusSwitch(props: SwitchProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusSwitch",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusSwitch",
  );

  const dataValue = useProteusValue({ path: props.name ?? "" });
  const hasValue = props.value !== undefined;

  useEffect(() => {
    if (
      hasValue &&
      props.name &&
      (dataValue === null || dataValue === undefined)
    ) {
      onDataChange?.(`${parentPath}/${props.name}`, "No");
    }
  }, [dataValue, hasValue, onDataChange, parentPath, props.name]);

  const checked = hasValue ? dataValue === props.value : Boolean(dataValue);

  return (
    <Switch
      {...props}
      checked={props.name ? checked : false}
      disabled={readOnly}
      onCheckedChange={(newChecked) => {
        if (props.name) {
          const newValue = hasValue
            ? newChecked
              ? props.value
              : "No"
            : newChecked;
          onDataChange?.(`${parentPath}/${props.name}`, newValue);
        }
      }}
    />
  );
}

ProteusSwitch.displayName = "@optiaxiom/proteus/ProteusSwitch";
