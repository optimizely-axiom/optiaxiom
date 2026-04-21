"use client";

import type { ComponentPropsWithRef } from "react";

import { IconBell } from "@optiaxiom/icons";
import { Button, Indicator } from "@optiaxiom/react";

export function App({
  intent = "success",
  variant = "subtle",
}: Pick<ComponentPropsWithRef<typeof Indicator>, "intent" | "variant">) {
  return (
    <Indicator content="4" intent={intent} variant={variant}>
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
