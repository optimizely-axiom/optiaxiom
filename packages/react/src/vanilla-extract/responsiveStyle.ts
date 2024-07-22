import type { StyleRule } from "@vanilla-extract/css";

import type { tokens } from "../tokens";

import { conditions } from "../utils";
import { style } from "./style";

type Breakpoint = keyof (typeof tokens)["screens"];

export const responsiveStyle = (
  rules: Partial<Record<Breakpoint, NonNullable<StyleRule["@media"]>[string]>>,
) =>
  style({
    "@media": Object.fromEntries(
      Object.entries(rules).map(([key, value]) => [
        conditions.conditions[key as Breakpoint]["@media"],
        value,
      ]),
    ),
  });
