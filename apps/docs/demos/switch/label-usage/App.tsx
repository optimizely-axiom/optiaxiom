import { Flex, Separator, Switch } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Switch>Label</Switch>
      <Separator orientation="vertical" />
      <Switch />
    </Flex>
  );
}
