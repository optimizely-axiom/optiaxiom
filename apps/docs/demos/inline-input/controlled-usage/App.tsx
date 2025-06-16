"use client";

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
        toaster.create("Title is a required field", { intent: "danger" });
      } else if (value !== serverValue) {
        setServerValue(value);
        toaster.create("Title updated", { intent: "success" });
      }
    }, 300);
  }

  return (
    <Heading asChild level="4" w="224">
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
