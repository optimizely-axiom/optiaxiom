"use client";

import type { ComponentPropsWithRef } from "react";

import { Range } from "@optiaxiom/react/unstable";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof Range>, "size">) {
  return <Range defaultValue={20} marks={[20, 50, 80]} size={size} w="384" />;
}
