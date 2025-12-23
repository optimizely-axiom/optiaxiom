import type { ReactNode } from "react";

import type { BlockTextElement } from "./types";

import { Text } from "../text";

export type BlockTextProps = Omit<BlockTextElement, "$type" | "children"> & {
  /**
   * Text content
   */
  children: ReactNode;
};

const colorMap = {
  default: "fg.default",
  secondary: "fg.secondary",
  tertiary: "fg.tertiary",
} as const;

export function BlockText({ children, color = "default" }: BlockTextProps) {
  return <Text color={colorMap[color]}>{children}</Text>;
}

BlockText.displayName = "@optiaxiom/react/BlockText";
