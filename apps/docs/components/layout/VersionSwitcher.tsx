"use client";

import { Badge } from "@optiaxiom/react";

import pkg from "../../../../packages/react/package.json";

export function VersionSwitcher() {
  return (
    <Badge asChild className="version" intent="success" variant="strong">
      <a href="https://www.npmjs.com/package/@optiaxiom/react">
        v{pkg.version}
      </a>
    </Badge>
  );
}
