"use client";

import { Button, Checkbox, Group } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState(false);

  return (
    <Group gap="16">
      <Checkbox checked={value} onCheckedChange={setValue}>
        Label
      </Checkbox>
      <Button disabled={!value} onClick={() => setValue(false)}>
        Reset
      </Button>
    </Group>
  );
}
