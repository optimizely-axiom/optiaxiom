import { Checkbox, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Checkbox
      endDecorator={
        <Text color="fg.secondary" fontSize="sm">
          Helper Text
        </Text>
      }
    >
      Label
    </Checkbox>
  );
}
