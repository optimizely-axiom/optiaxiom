import { Checkbox } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState<"indeterminate" | boolean>(false);

  return (
    <Checkbox
      checked={value}
      onCheckedChange={() =>
        setValue((value) =>
          value === "indeterminate" ? false : "indeterminate",
        )
      }
    >
      Label
    </Checkbox>
  );
}
