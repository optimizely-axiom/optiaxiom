"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Kbd, Text } from "@optiaxiom/react";

export function App({
  variant = "outline",
}: Pick<ComponentPropsWithoutRef<typeof Kbd>, "variant">) {
  return (
    <Text>
      <Kbd modifiers="meta" variant={variant}>
        K
      </Kbd>
    </Text>
  );
}
