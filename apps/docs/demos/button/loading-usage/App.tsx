"use client";

import { Button, Group, Switch, Tooltip } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Group flexDirection="column" gap="16">
      <Group gap="16">
        <Tooltip content="Loading button demo">
          <Button appearance="primary" disabled={loading} loading={loading}>
            Primary
          </Button>
        </Tooltip>

        <Tooltip content="Loading button demo">
          <Button disabled={loading} loading={loading}>
            Default
          </Button>
        </Tooltip>

        <Tooltip content="Loading button demo">
          <Button appearance="subtle" disabled={loading} loading={loading}>
            Subtle
          </Button>
        </Tooltip>
      </Group>
      <Switch
        checked={loading}
        onCheckedChange={() => setLoading((loading) => !loading)}
      >
        Loading
      </Switch>
    </Group>
  );
}
