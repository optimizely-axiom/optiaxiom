import type { ComponentPropsWithRef } from "react";

import { Spinner } from "@optiaxiom/react";

export function App({
  colorScheme = "inverse",
}: Pick<ComponentPropsWithRef<typeof Spinner>, "colorScheme">) {
  return (
    <Spinner
      bg={colorScheme === "default" ? "bg.default" : "bg.default.inverse"}
      colorScheme={colorScheme}
      p="xs"
      rounded="sm"
      size="sm"
    />
  );
}
