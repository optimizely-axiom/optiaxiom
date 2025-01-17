"use client";

import type { ComponentPropsWithRef } from "react";

import { Link } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App({
  appearance = "default",
}: Pick<ComponentPropsWithRef<typeof Link>, "appearance">) {
  return (
    <Canvas appearance={appearance}>
      <Link appearance={appearance} href="data:,">
        Link
      </Link>
    </Canvas>
  );
}
