import { RadioGroup, RadioGroupItem } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup name="label-usage">
      <RadioGroupItem value="one" />
      <RadioGroupItem value="two">Option Two</RadioGroupItem>
    </RadioGroup>
  );
}
