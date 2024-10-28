import { Button, Flex, Radio, RadioGroup } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");

  return (
    <Flex>
      <RadioGroup
        name="controlled-usage"
        onValueChange={setValue}
        value={value}
      >
        <Radio value="one">Option One</Radio>
        <Radio value="two">Option Two</Radio>
        <Radio value="three">Option Three</Radio>
      </RadioGroup>

      <Button disabled={!value} onClick={() => setValue("")}>
        Reset
      </Button>
    </Flex>
  );
}
