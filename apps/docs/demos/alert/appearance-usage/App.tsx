"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Alert } from "@optiaxiom/react";

export function App({
  intent,
}: Pick<ComponentPropsWithoutRef<typeof Alert>, "intent">) {
  return <Alert intent={intent}>Description of the alert message</Alert>;
}
