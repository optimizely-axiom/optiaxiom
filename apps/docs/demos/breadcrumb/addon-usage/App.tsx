import { IconPen } from "@optiaxiom/icons";
import { Breadcrumb, Button } from "@optiaxiom/react";

export function App() {
  return (
    <Breadcrumb
      items={[
        {
          href: "/optiaxiom",
          label: "Home",
        },
        {
          addonAfter: (
            <Button
              appearance="subtle"
              aria-label="Edit parent page"
              icon={<IconPen />}
              size="sm"
            />
          ),
          href: "/optiaxiom/components",
          label: "Components",
        },
        {
          href: "/optiaxiom/components/breadcrumb",
          label: "Breadcrumb",
        },
      ]}
    />
  );
}
