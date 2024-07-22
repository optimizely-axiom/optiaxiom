import { RadioGroup, RadioGroupItem, Text } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup>
      <RadioGroupItem
        endDecorator={
          <Text color="fg.secondary" fontSize="sm">
            Helper Text
          </Text>
        }
        value="one"
      >
        Option One
      </RadioGroupItem>
      <RadioGroupItem value="two">Option Two</RadioGroupItem>
    </RadioGroup>
  );
}
