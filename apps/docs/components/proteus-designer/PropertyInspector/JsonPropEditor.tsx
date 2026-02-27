import { Textarea } from "@optiaxiom/react";
import { useState } from "react";

export function JsonPropEditor({
  onUpdate,
  value,
}: {
  onUpdate: (value: unknown) => void;
  value: unknown;
}) {
  const [text, setText] = useState(() =>
    value != null ? JSON.stringify(value, null, 2) : "",
  );
  const [error, setError] = useState(false);

  return (
    <Textarea
      error={error}
      fontFamily="mono"
      onValueChange={(value) => {
        setText(value);
        try {
          const parsed = JSON.parse(value);
          onUpdate(parsed);
          setError(false);
        } catch {
          setError(true);
        }
      }}
      resize="vertical"
      rows={3}
      value={text}
    />
  );
}
