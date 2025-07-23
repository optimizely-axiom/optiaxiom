"use client";

import { Breadcrumb, toaster } from "@optiaxiom/react";

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
