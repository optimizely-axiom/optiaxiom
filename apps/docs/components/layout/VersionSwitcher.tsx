"use client";

import { Select, SelectContent, SelectTrigger } from "@optiaxiom/react";
import { useEffect, useState } from "react";

export function VersionSwitcher() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const isNext = basePath.endsWith("/v3");
  const root = basePath.replace(/\/v3$/, "") || "";

  const [versions, setVersions] = useState([
    { detail: "", label: "v1", value: "v1" as const },
    { detail: "", label: "v3", value: "v3" as const },
  ]);

  useEffect(() => {
    void Promise.all([
      fetch(`${root}/version.json`)
        .then((res) => res.json())
        .catch(() => null),
      fetch(`${root}/v3/version.json`)
        .then((res) => res.json())
        .catch(() => null),
    ]).then(([main, next]) => {
      setVersions([
        {
          detail: main?.version ? `(${main.version})` : "",
          label: "v1",
          value: "v1",
        },
        {
          detail: next?.version ? `(${next.version})` : "",
          label: "v3",
          value: "v3",
        },
      ]);
    });
  }, [root]);

  return (
    <Select
      defaultValue={isNext ? "v3" : "v1"}
      onValueChange={(value) => {
        if (value === "v3") {
          window.location.href = `${root}/v3/`;
        } else {
          window.location.href = `${root}/`;
        }
      }}
      options={versions}
    >
      <SelectTrigger className="version-switcher">
        {isNext
          ? `v${versions[1].detail ? versions[1].detail.slice(1, -1) : "3"}`
          : `v${versions[0].detail ? versions[0].detail.slice(1, -1) : "1"}`}
      </SelectTrigger>
      <SelectContent />
    </Select>
  );
}
