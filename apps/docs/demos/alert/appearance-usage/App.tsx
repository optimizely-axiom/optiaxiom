import type { ComponentPropsWithoutRef } from "react";

import { Alert, AlertDescription, AlertTitle } from "@optiaxiom/react";

export function App({
  colorScheme,
  variant,
}: Pick<ComponentPropsWithoutRef<typeof Alert>, "colorScheme" | "variant">) {
  return (
    <Alert colorScheme={colorScheme} variant={variant}>
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Description of the alert message</AlertDescription>
    </Alert>
  );
}
