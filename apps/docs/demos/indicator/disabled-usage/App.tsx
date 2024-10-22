import type { ComponentPropsWithRef } from "react";

import { Button, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

export function App({
  disabled = false,
}: Pick<ComponentPropsWithRef<typeof Indicator>, "disabled">) {
  return (
    <Indicator colorScheme="danger" content="4" disabled={disabled}>
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
