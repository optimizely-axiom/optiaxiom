"use client";

import type { ComponentPropsWithRef } from "react";

import { Button } from "@optiaxiom/react";

export function App({
  appearance = "default",
  size = "md",
}: Pick<ComponentPropsWithRef<typeof Button>, "appearance" | "size">) {
  return (
    <Button appearance={appearance} size={size}>
      Button
    </Button>
  );
}
