import { createGlobalTheme } from "@vanilla-extract/css";

import { tokens } from "./tokens";

export const theme = createGlobalTheme(":root", tokens);
