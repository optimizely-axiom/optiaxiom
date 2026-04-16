"use client";

import type { ComponentPropsWithRef } from "react";

import { IconDockToRight } from "@optiaxiom/icons";
import { ToggleButton } from "@optiaxiom/react";

export function App({
  size = "md",
}: Pick<ComponentPropsWithRef<typeof ToggleButton>, "size">) {
  return (
    <ToggleButton
      aria-label="Toggle sidebar"
      icon={<IconDockToRight />}
      size={size}
    />
  );
}
