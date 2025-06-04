"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Kbd, Text } from "@optiaxiom/react";

export function App({
  modifiers = "meta",
}: Pick<ComponentPropsWithoutRef<typeof Kbd>, "modifiers">) {
  return (
    <Text>
      <Kbd modifiers={modifiers}>K</Kbd>
    </Text>
  );
}
