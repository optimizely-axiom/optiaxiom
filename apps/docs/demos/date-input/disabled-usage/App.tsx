"use client";

import type { ComponentPropsWithoutRef } from "react";

import { DateInput } from "@optiaxiom/react/unstable";

export function App({
  disabled = true,
}: Pick<ComponentPropsWithoutRef<typeof DateInput>, "disabled">) {
  return <DateInput disabled={disabled} />;
}
