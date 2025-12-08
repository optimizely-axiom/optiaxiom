"use client";

import { Button, Group, Switch } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState(false);

  return (
    <Group gap="16">
      <Switch checked={value} onCheckedChange={setValue}>
        Label
      </Switch>
      <Button disabled={!value} onClick={() => setValue(false)}>
        Reset
      </Button>
    </Group>
  );
}
