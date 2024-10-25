import { Button, Flex, RadioGroup, RadioGroupItem } from "@optiaxiom/react";
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
        <RadioGroupItem value="one">Option One</RadioGroupItem>
        <RadioGroupItem value="two">Option Two</RadioGroupItem>
        <RadioGroupItem value="three">Option Three</RadioGroupItem>
      </RadioGroup>

      <Button disabled={!value} onClick={() => setValue("")}>
        Reset
      </Button>
    </Flex>
  );
}
