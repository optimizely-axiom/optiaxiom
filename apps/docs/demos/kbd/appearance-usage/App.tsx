import type { ComponentPropsWithoutRef } from "react";

import { Kbd, Text } from "@optiaxiom/react";

export function App({
  variant = "outline",
}: Pick<ComponentPropsWithoutRef<typeof Kbd>, "variant">) {
  return (
    <Text>
      <Kbd keys="command" variant={variant}>
        K
      </Kbd>
    </Text>
  );
}
