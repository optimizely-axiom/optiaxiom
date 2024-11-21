import { Heading, toaster } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [key, setKey] = useState(0);
  const [serverValue, setServerValue] = useState("Sample title");
  const [value, setValue] = useState(serverValue);

  function setTitle() {
    setTimeout(() => {
      if (!value.length) {
        setValue(serverValue);
        setKey((key) => key + 1);
        toaster.create({
          title: "Title is a required field",
          type: "danger",
        });
      } else if (value !== serverValue) {
        setServerValue(value);
        toaster.create({
          title: "Title updated",
          type: "success",
        });
      }
    }, 300);
  }

  return (
    <Heading asChild key={`k-${key}`} level="5" w="240">
      <InlineInput
        defaultValue={value}
        label="Task title"
        onBlur={setTitle}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setTitle();
          }
        }}
        onValueChange={setValue}
      />
    </Heading>
  );
}
