import { Radio, RadioGroup } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup disabled name="disabled-group-usage" value="one">
      <Radio value="one">Option One</Radio>
      <Radio value="two">Option Two</Radio>
    </RadioGroup>
  );
}
