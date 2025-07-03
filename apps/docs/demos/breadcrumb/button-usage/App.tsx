"use client";

import { toaster } from "@optiaxiom/react";
import { Breadcrumb } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Breadcrumb
      items={[
        {
          execute: () => toaster.create("Navigate to Home"),
          label: "Home",
        },
        {
          execute: () => toaster.create("Navigate to Components"),
          label: "Components",
        },
        {
          execute: () => toaster.create("Navigate to Breadcrumb"),
          label: "Breadcrumb",
        },
      ]}
    />
  );
}
