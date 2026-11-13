"use client";

import { Kbd, type MenuOption } from "@optiaxiom/react";
import {
  Spotlight,
  SpotlightContent,
  SpotlightTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo } from "react";

export function App() {
  return (
    <Spotlight
      options={useMemo<MenuOption[]>(
        () => [
          { href: "../", label: "Components" },
          { href: "../../", label: "Home" },
        ],
        [],
      )}
    >
      <SpotlightTrigger aria-label="Search" display={["flex", "none"]} />
      <SpotlightTrigger
        addonAfter={
          <Kbd color="fg.tertiary" ml="auto" modifiers="mod" variant="subtle">
            K
          </Kbd>
        }
        display={["none", "flex"]}
        w="224"
      >
        Search
      </SpotlightTrigger>
      <SpotlightContent />
    </Spotlight>
  );
}
