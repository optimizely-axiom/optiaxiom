import { Button, Checkbox, Flex } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState(false);

  return (
    <Flex flexDirection="row">
      <Checkbox checked={value} onCheckedChange={setValue}>
        Label
      </Checkbox>

      <Button disabled={!value} onClick={() => setValue(false)}>
        Reset
      </Button>
    </Flex>
  );
}
