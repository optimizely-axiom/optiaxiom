import type { ComponentPropsWithoutRef } from "react";

import { Alert, AlertDescription, AlertTitle } from "@optiaxiom/react";

export function App({
  colorScheme,
}: Pick<ComponentPropsWithoutRef<typeof Alert>, "colorScheme">) {
  return (
    <Alert colorScheme={colorScheme}>
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Description of the alert message</AlertDescription>
    </Alert>
  );
}
