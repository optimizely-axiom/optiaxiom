"use client";

import { Breadcrumb, type BreadcrumbLink } from "@optiaxiom/react/unstable";

const items = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/components/breadcrumb", label: "Breadcrumb" },
] satisfies BreadcrumbLink[];

export function App() {
  return <Breadcrumb items={items} />;
}
