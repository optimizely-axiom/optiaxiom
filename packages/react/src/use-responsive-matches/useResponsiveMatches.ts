import { useMediaQuery } from "@mantine/hooks";

import { conditions } from "../utils";

const list = ["md", "sm"] as const;

export const useResponsiveMatches = <const B, const T>(
  config: { base: B } & Partial<Record<(typeof list)[number], T>>,
) => {
  const matches = {
    base: true,
    sm: useMediaQuery(conditions.conditions.sm["@media"]),
    md: useMediaQuery(conditions.conditions.md["@media"]),
  };

  for (const name of list) {
    if (config[name] && matches[name]) {
      return config[name];
    }
  }

  return config.base;
};
