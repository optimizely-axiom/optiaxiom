import { Breadcrumb, type BreadcrumbLink } from "@optiaxiom/react/unstable";

const items = [
  { href: "/optiaxiom", label: "Home" },
  { href: "/optiaxiom/components", label: "Components" },
  { href: "/optiaxiom/components/breadcrumb", label: "Breadcrumb" },
] satisfies BreadcrumbLink[];

export function App() {
  return <Breadcrumb items={items} />;
}
