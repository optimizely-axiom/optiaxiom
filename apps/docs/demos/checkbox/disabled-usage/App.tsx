import { Checkbox, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Checkbox defaultChecked disabled>
        Label
      </Checkbox>
      <Checkbox disabled>Label</Checkbox>
    </Flex>
  );
}
