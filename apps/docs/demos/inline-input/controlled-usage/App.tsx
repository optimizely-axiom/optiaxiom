import { Heading, toaster } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [serverValue, setServerValue] = useState("Sample title");
  const [value, setValue] = useState(serverValue);

  function setTitle() {
    setTimeout(() => {
      if (!value.length) {
        setValue(serverValue);
        toaster.create("Title is a required field", { type: "danger" });
      } else if (value !== serverValue) {
        setServerValue(value);
        toaster.create("Title updated", { type: "success" });
      }
    }, 300);
  }

  return (
    <Heading asChild level="5" w="224">
      <InlineInput
        label="Task title"
        onBlur={setTitle}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setTitle();
          }
        }}
        onValueChange={setValue}
        value={value}
      />
    </Heading>
  );
}
