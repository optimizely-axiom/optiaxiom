"use client";

import type { ComponentPropsWithoutRef } from "react";

import { DateInput } from "@optiaxiom/react";

export function App({
  error = true,
}: Pick<ComponentPropsWithoutRef<typeof DateInput>, "error">) {
  return <DateInput error={error} />;
}
