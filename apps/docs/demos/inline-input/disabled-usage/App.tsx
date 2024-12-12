import type { ComponentPropsWithoutRef } from "react";

import { Text } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";

export function App({
  disabled = true,
}: Pick<ComponentPropsWithoutRef<typeof InlineInput>, "disabled">) {
  return (
    <Text asChild color="fg.default" w="224">
      <InlineInput
        defaultValue="Sample task title"
        disabled={disabled}
        label="Task title"
      />
    </Text>
  );
}
