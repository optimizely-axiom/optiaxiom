import { Switch, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Switch
      endDecorator={
        <Text color="fg.secondary" fontSize="sm">
          Helper Text
        </Text>
      }
    >
      Label
    </Switch>
  );
}
