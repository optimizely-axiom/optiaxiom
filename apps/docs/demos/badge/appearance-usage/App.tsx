import type { ComponentPropsWithRef } from "react";

import { Badge } from "@optiaxiom/react";

export function App({
  colorScheme = "success",
  variant = "light",
}: Pick<ComponentPropsWithRef<typeof Badge>, "colorScheme" | "variant">) {
  return (
    <Badge colorScheme={colorScheme} variant={variant}>
      Pending
    </Badge>
  );
}
