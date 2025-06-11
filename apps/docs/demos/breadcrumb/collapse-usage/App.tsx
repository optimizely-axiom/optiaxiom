import { Breadcrumb } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Breadcrumb
      items={[
        { href: "/", label: "Home" },
        { href: "/optiaxiom", label: "Documentation" },
        { href: "/optiaxiom/guides", label: "Guides" },
        { href: "/optiaxiom/components", label: "Components" },
        { href: "/optiaxiom/components/breadcrumb", label: "Breadcrumb" },
      ]}
    />
  );
}
