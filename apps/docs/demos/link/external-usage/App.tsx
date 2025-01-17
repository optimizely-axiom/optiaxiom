"use client";

import type { ComponentPropsWithRef } from "react";

import { Link, Text } from "@optiaxiom/react";

export function App({
  external = true,
}: Pick<ComponentPropsWithRef<typeof Link>, "external">) {
  return (
    <Text>
      This is{" "}
      <Link external={external} href="data:,">
        an external link
      </Link>
    </Text>
  );
}
