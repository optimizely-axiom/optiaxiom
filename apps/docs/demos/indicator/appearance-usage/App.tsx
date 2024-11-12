import type { ComponentPropsWithRef } from "react";

import { Button, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

export function App({
  intent = "success",
  variant = "light",
}: Pick<ComponentPropsWithRef<typeof Indicator>, "intent" | "variant">) {
  return (
    <Indicator content="4" intent={intent} variant={variant}>
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
