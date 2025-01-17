"use client";

import type { ComponentPropsWithRef } from "react";

import { Button, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

export function App({
  disabled = false,
}: Pick<ComponentPropsWithRef<typeof Indicator>, "disabled">) {
  return (
    <Indicator content="4" disabled={disabled} intent="danger">
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
