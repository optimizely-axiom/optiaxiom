"use client";

import type { ComponentPropsWithRef } from "react";

import { IconDelete } from "@optiaxiom/icons";
import { Button } from "@optiaxiom/react";

export function App({
  appearance = "default",
  iconPosition = "start",
}: Pick<ComponentPropsWithRef<typeof Button>, "appearance" | "iconPosition">) {
  return (
    <Button
      appearance={appearance}
      icon={<IconDelete />}
      iconPosition={iconPosition}
    >
      Delete
    </Button>
  );
}
