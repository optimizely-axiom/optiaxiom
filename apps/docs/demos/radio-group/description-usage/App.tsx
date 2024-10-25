import { RadioGroup, RadioGroupItem } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup name="description-usage">
      <RadioGroupItem description="Helper Text" value="one">
        Option One
      </RadioGroupItem>
      <RadioGroupItem value="two">Option Two</RadioGroupItem>
    </RadioGroup>
  );
}
