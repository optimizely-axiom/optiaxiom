"use client";

import { toaster } from "@optiaxiom/react";
import { Pill } from "@optiaxiom/react/unstable";

export function App() {
  return <Pill onDismiss={() => toaster.create("Dismissed pill")}>Label</Pill>;
}
