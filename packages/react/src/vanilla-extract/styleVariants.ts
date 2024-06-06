import { styleVariants as veStyleVariants } from "@vanilla-extract/css";

import { style } from "./style";

// @ts-expect-error -- too complex
export const styleVariants: typeof veStyleVariants = (
  ...args: Parameters<typeof veStyleVariants>
) => {
  const debugId = typeof args[1] === "function" ? args[2] : args[1];
  const result: Record<string, unknown> = {};
  for (const key in args[0]) {
    result[key] = style(
      // @ts-expect-error -- too complex
      typeof args[1] === "function" ? args[1](args[0][key], key) : args[0][key],
      debugId ? `${debugId}_${key}` : key,
    );
  }
  return result;
};
