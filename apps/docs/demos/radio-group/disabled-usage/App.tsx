import { Radio, RadioGroup } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup name="disabled-usage">
      <Radio defaultChecked value="one">
        Option One
      </Radio>
      <Radio disabled value="two">
        Option Two
      </Radio>
      <Radio value="three">Option Three</Radio>
    </RadioGroup>
  );
}
