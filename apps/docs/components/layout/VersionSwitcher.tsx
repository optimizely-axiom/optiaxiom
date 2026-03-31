"use client";

import { Select, SelectContent, SelectTrigger } from "@optiaxiom/react";

import pkg from "../../../../packages/react/package.json";

const versions = [
  { label: `v${pkg.version}`, value: "v1" },
  { label: "v3 (next)", value: "v3" },
] as const;

export function VersionSwitcher() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const isNext = basePath.endsWith("/v3");

  return (
    <Select
      defaultValue={isNext ? "v3" : "v1"}
      onValueChange={(value) => {
        const root = basePath.replace(/\/v3$/, "") || "";
        if (value === "v3") {
          window.location.href = `${root}/v3/`;
        } else {
          window.location.href = `${root}/`;
        }
      }}
      options={versions}
    >
      <SelectTrigger className="version-switcher" />
      <SelectContent />
    </Select>
  );
}
