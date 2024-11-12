import type { ComponentPropsWithoutRef } from "react";

import { Alert, AlertDescription, AlertTitle } from "@optiaxiom/react";

export function App({
  intent,
}: Pick<ComponentPropsWithoutRef<typeof Alert>, "intent">) {
  return (
    <Alert intent={intent}>
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Description of the alert message</AlertDescription>
    </Alert>
  );
}
