import { Radio, RadioGroup } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup name="label-usage">
      <Radio value="one" />
      <Radio value="two">Option Two</Radio>
    </RadioGroup>
  );
}
