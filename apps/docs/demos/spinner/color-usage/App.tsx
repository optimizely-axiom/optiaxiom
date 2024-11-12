import type { ComponentPropsWithRef } from "react";

import { Spinner } from "@optiaxiom/react";

export function App({
  appearance = "inverse",
}: Pick<ComponentPropsWithRef<typeof Spinner>, "appearance">) {
  return (
    <Spinner
      appearance={appearance}
      bg={appearance === "default" ? "bg.default" : "bg.default.inverse"}
      p="xs"
      rounded="sm"
      size="sm"
    />
  );
}
