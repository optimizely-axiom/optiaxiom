import type { ComponentPropsWithRef } from "react";

import { Button } from "@optiaxiom/react";

export function App({
  appearance = "default",
}: Pick<ComponentPropsWithRef<typeof Button>, "appearance">) {
  return <Button appearance={appearance}>Delete</Button>;
}
