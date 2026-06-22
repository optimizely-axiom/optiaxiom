"use client";

import { Select, SelectContent, SelectTrigger } from "@optiaxiom/react";
import { useEffect, useState } from "react";

export function VersionSwitcher() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const isV1 = basePath.endsWith("/v1");
  const root = basePath.replace(/\/v1$/, "") || "";

  const [versions, setVersions] = useState([
    { detail: "", label: "v1", value: "v1" as const },
    { detail: "", label: "v3", value: "v3" as const },
  ]);

  useEffect(() => {
    void Promise.all([
      fetch(`${root}/v1/version.json`)
        .then((res) => res.json())
        .catch(() => null),
      fetch(`${root}/version.json`)
        .then((res) => res.json())
        .catch(() => null),
    ]).then(([v1, v3]) => {
      setVersions([
        {
          detail: v1?.version ? `(${v1.version})` : "",
          label: "v1",
          value: "v1",
        },
        {
          detail: v3?.version ? `(${v3.version})` : "",
          label: "v3",
          value: "v3",
        },
      ]);
    });
  }, [root]);

  return (
    <Select
      defaultValue={isV1 ? "v1" : "v3"}
      onValueChange={(value) => {
        if (value === "v1") {
          window.location.href = `${root}/v1/`;
        } else {
          window.location.href = `${root}/`;
        }
      }}
      options={versions}
    >
      <SelectTrigger className="version-switcher">
        {isV1
          ? `v${versions[0].detail ? versions[0].detail.slice(1, -1) : "1"}`
          : `v${versions[1].detail ? versions[1].detail.slice(1, -1) : "3"}`}
      </SelectTrigger>
      <SelectContent />
    </Select>
  );
}
