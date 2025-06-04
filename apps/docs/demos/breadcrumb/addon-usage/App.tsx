"use client";

import { Button } from "@optiaxiom/react";
import { Breadcrumb } from "@optiaxiom/react/unstable";
import { IconPencil } from "@tabler/icons-react";

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
              icon={<IconPencil />}
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
