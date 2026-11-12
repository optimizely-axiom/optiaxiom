"use client";

import { type MenuOption, toaster } from "@optiaxiom/react";
import {
  Spotlight,
  SpotlightContent,
  SpotlightTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo } from "react";

const groups = {
  projects: { label: "Projects" },
  recent: { label: "Recent" },
} satisfies Record<string, MenuOption["group"]>;

const projects = ["Atlas", "Beacon", "Comet", "Delta", "Echo"];
const recent = ["Comet", "Atlas"];

export function App() {
  return (
    <Spotlight
      options={useMemo(
        () => [
          ...recent.map<MenuOption>((name) => ({
            execute: () => toaster.create(`Opened ${name}`),
            group: groups.recent,
            key: `recent-${name}`,
            label: name,
            visible: ({ inputValue }) => !inputValue,
          })),
          ...projects.map<MenuOption>((name) => ({
            execute: () => toaster.create(`Opened ${name}`),
            group: groups.projects,
            key: `project-${name}`,
            label: name,
            visible: ({ inputValue }) =>
              inputValue
                ? name.toLowerCase().includes(inputValue.toLowerCase())
                : false,
          })),
        ],
        [],
      )}
    >
      <SpotlightTrigger>Search projects</SpotlightTrigger>
      <SpotlightContent />
    </Spotlight>
  );
}
