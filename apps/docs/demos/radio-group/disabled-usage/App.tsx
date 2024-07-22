import { RadioGroup, RadioGroupItem } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup>
      <RadioGroupItem defaultChecked disabled value="one">
        Option One
      </RadioGroupItem>
      <RadioGroupItem disabled value="two">
        Option Two
      </RadioGroupItem>
      <RadioGroupItem value="three">Option Three</RadioGroupItem>
    </RadioGroup>
  );
}
