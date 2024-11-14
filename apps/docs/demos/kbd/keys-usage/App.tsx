import type { ComponentPropsWithoutRef } from "react";

import { Kbd, Text } from "@optiaxiom/react";

export function App({
  keys = "command",
}: Pick<ComponentPropsWithoutRef<typeof Kbd>, "keys">) {
  return (
    <Text>
      <Kbd keys={keys}>K</Kbd>
    </Text>
  );
}
