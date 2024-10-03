import { Button, Flex, Switch, Tooltip } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Flex>
      <Flex flexDirection="row">
        <Tooltip content="Loading button demo">
          <Button appearance="primary" loading={loading}>
            Primary
          </Button>
        </Tooltip>

        <Tooltip content="Loading button demo">
          <Button loading={loading}>Default</Button>
        </Tooltip>

        <Tooltip content="Loading button demo">
          <Button appearance="subtle" loading={loading}>
            Subtle
          </Button>
        </Tooltip>
      </Flex>

      <Switch
        checked={loading}
        onCheckedChange={() => setLoading((loading) => !loading)}
      >
        Loading
      </Switch>
    </Flex>
  );
}
