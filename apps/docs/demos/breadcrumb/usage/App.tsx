"use client";

import { Breadcrumb } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Breadcrumb
      items={[
        { href: "/", label: "Home" },
        { href: "/components", label: "Components" },
        { href: "/components/breadcrumb", label: "Breadcrumb" },
      ]}
    />
  );
}
