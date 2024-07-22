import { Button, Flex, Switch } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState(false);

  return (
    <Flex flexDirection="row">
      <Switch checked={value} onCheckedChange={setValue}>
        Label
      </Switch>

      <Button disabled={!value} onClick={() => setValue(false)}>
        Reset
      </Button>
    </Flex>
  );
}
