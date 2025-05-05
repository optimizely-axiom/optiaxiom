"use client";

import type { ComponentPropsWithoutRef } from "react";

import { DateInput } from "@optiaxiom/react";

export function App({
  type = "datetime-local",
}: Pick<ComponentPropsWithoutRef<typeof DateInput>, "type">) {
  return <DateInput type={type} />;
}
