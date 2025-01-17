"use client";

import type { ComponentPropsWithRef } from "react";

import { Avatar } from "@optiaxiom/react";

export function App({
  name = "Arthur Morgan",
}: Pick<ComponentPropsWithRef<typeof Avatar>, "name">) {
  return <Avatar name={name} />;
}
