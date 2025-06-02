"use client";

import { Breadcrumb } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Breadcrumb
      items={[
        { href: "/", label: "Home" },
        { href: "/docs", label: "Documentation" },
        { href: "/docs/components", label: "Components" },
        { href: "/docs/components/demos", label: "Demos" },
        { href: "/docs/components/breadcrumb", label: "Breadcrumb" },
      ]}
    />
  );
}
