import { Breadcrumb } from "@optiaxiom/react";

export function App() {
  return (
    <Breadcrumb
      items={[
        { href: "/optiaxiom", label: "Home" },
        { href: "/optiaxiom/components", label: "Components" },
        { href: "/optiaxiom/components/breadcrumb", label: "Breadcrumb" },
      ]}
    />
  );
}
