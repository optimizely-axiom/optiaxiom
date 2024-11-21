import type { ComponentPropsWithoutRef } from "react";

import { Text } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";

export function App({
  multiline = true,
}: Pick<ComponentPropsWithoutRef<typeof InlineInput>, "multiline">) {
  return (
    <Text asChild color="fg.default" w="240">
      <InlineInput label="Task description" multiline={multiline} />
    </Text>
  );
}
