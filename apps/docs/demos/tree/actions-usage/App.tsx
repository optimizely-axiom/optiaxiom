"use client";

import {
  IconCopy,
  IconFileLines,
  IconFolder,
  IconTrashCan,
} from "@optiaxiom/icons";
import { toaster } from "@optiaxiom/react";
import { Tree, type TreeOption } from "@optiaxiom/react/unstable";

const page = (
  value: string,
  label: string,
  children?: TreeOption[],
): TreeOption => ({
  actions: [
    {
      addon: <IconCopy />,
      execute: () => toaster.create(`Duplicated ${label}`),
      label: "Duplicate",
    },
    {
      addon: <IconTrashCan />,
      disabledReason:
        value === "website" ? "The site root can't be deleted" : undefined,
      execute: () => toaster.create(`Deleted ${label}`),
      group: { hidden: true, label: "Danger", separator: true },
      intent: "danger",
      label: "Delete",
    },
  ],
  children,
  icon: children ? <IconFolder /> : <IconFileLines />,
  label,
  value,
});

export function App() {
  return (
    <Tree
      aria-label="Pages"
      defaultExpanded={["website"]}
      options={[
        page("website", "Website", [
          page("about", "About us"),
          page("pricing", "Pricing"),
          page("contact", "Contact"),
        ]),
      ]}
      w="224"
    />
  );
}
