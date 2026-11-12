"use client";

import { type MenuOption, toaster } from "@optiaxiom/react";
import {
  Spotlight,
  SpotlightContent,
  SpotlightTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo } from "react";

const groups = {
  actions: { label: "Actions" },
  pages: { label: "Pages" },
} satisfies Record<string, MenuOption["group"]>;

export function App() {
  return (
    <Spotlight
      options={useMemo<MenuOption[]>(
        () => [
          { group: groups.pages, href: "../", label: "Components" },
          { group: groups.pages, href: "../../", label: "Home" },
          {
            execute: () => toaster.create("Created a project"),
            group: groups.actions,
            label: "Create project",
          },
          {
            execute: () => toaster.create("Invited a member"),
            group: groups.actions,
            label: "Invite member",
          },
        ],
        [],
      )}
    >
      <SpotlightTrigger>Search</SpotlightTrigger>
      <SpotlightContent />
    </Spotlight>
  );
}
