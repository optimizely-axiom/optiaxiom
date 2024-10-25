import { RadioGroup, RadioGroupItem } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup disabled name="disabled-group-usage" value="one">
      <RadioGroupItem value="one">Option One</RadioGroupItem>
      <RadioGroupItem value="two">Option Two</RadioGroupItem>
    </RadioGroup>
  );
}
