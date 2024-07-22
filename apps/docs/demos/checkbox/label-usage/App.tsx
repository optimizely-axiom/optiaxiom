import { Checkbox, Flex, Separator } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Checkbox>Label</Checkbox>
      <Separator orientation="vertical" />
      <Checkbox />
    </Flex>
  );
}
