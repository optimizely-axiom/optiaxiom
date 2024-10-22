import type { ComponentPropsWithRef } from "react";

import { Button, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

export function App({
  colorScheme = "success",
  variant = "light",
}: Pick<ComponentPropsWithRef<typeof Indicator>, "colorScheme" | "variant">) {
  return (
    <Indicator colorScheme={colorScheme} content="4" variant={variant}>
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
