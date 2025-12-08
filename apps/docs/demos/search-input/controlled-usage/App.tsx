"use client";

import { Button, Group, SearchInput } from "@optiaxiom/react";
import { useRef, useState } from "react";

export function App() {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Group flexDirection="column" gap="16">
      <SearchInput
        onChange={(event) => setValue(event.target.value)}
        ref={ref}
        value={value}
        w="224"
      />
      <Group gap="16">
        <Button
          onClick={() => {
            setValue("sample");
            ref.current?.focus();
          }}
        >
          Set Value
        </Button>

        <Button disabled={!value} onClick={() => setValue("")}>
          Reset
        </Button>
      </Group>
    </Group>
  );
}
