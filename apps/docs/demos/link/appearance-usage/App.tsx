"use client";

import type { ComponentPropsWithRef } from "react";

import { Link, Text } from "@optiaxiom/react";

export function App({
  appearance = "default",
}: Pick<ComponentPropsWithRef<typeof Link>, "appearance">) {
  return (
    <Text
      bg={appearance === "inverse" ? "bg.default.inverse" : "bg.default"}
      px="12"
      py="8"
      rounded="sm"
    >
      <Link appearance={appearance} href="data:,">
        Link
      </Link>
    </Text>
  );
}
