"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Banner } from "@optiaxiom/react";

export function App({
  intent,
}: Pick<ComponentPropsWithoutRef<typeof Banner>, "intent">) {
  return <Banner intent={intent}>Description of the banner message</Banner>;
}
