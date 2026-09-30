"use client";

import type { ComponentPropsWithRef } from "react";

import { Checkbox } from "@optiaxiom/react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof Checkbox>, "size">) {
  return <Checkbox size={size}>Label</Checkbox>;
}
