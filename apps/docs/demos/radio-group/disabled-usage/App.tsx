import { RadioGroup, RadioGroupItem } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup name="disabled-usage">
      <RadioGroupItem defaultChecked value="one">
        Option One
      </RadioGroupItem>
      <RadioGroupItem disabled value="two">
        Option Two
      </RadioGroupItem>
      <RadioGroupItem value="three">Option Three</RadioGroupItem>
    </RadioGroup>
  );
}
