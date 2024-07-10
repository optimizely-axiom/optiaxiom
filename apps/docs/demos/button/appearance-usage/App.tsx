import type { ComponentPropsWithRef } from "react";

import { Button } from "@optiaxiom/react";

export function App({
  appearance = "default",
  colorScheme,
  variant,
}: Pick<
  ComponentPropsWithRef<typeof Button>,
  "appearance" | "colorScheme" | "variant"
>) {
  return (
    <Button appearance={appearance} colorScheme={colorScheme} variant={variant}>
      Delete
    </Button>
  );
}
