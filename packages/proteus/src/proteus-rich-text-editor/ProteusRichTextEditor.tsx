import { RichTextEditor, type RichTextEditorProps } from "@optiaxiom/react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export function ProteusRichTextEditor(props: RichTextEditorProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusRichTextEditor",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusRichTextEditor",
  );

  const value = useProteusValue({ path: props.name ?? "" });

  return (
    <RichTextEditor
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

ProteusRichTextEditor.displayName = "@optiaxiom/proteus/ProteusRichTextEditor";
