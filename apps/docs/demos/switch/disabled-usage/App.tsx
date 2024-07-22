import { Flex, Switch } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Switch defaultChecked disabled>
        Label
      </Switch>
      <Switch disabled>Label</Switch>
    </Flex>
  );
}
