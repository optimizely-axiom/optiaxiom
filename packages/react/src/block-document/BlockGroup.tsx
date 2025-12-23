import type { ReactNode } from "react";

import type { BlockGroupElement } from "./types";

import { Flex } from "../flex";

export type BlockGroupProps = Omit<BlockGroupElement, "$type" | "children"> & {
  /**
   * Child elements to render in the group
   */
  children: ReactNode;
};

const gapMap = {
  xs: "4",
  sm: "8",
  md: "16",
  lg: "24",
  xl: "32",
} as const;

export function BlockGroup({
  children,
  flexDirection = "vertical",
  gap = "md",
}: BlockGroupProps) {
  return (
    <Flex
      flexDirection={flexDirection === "vertical" ? "column" : "row"}
      gap={gapMap[gap]}
      w="full"
    >
      {children}
    </Flex>
  );
}

BlockGroup.displayName = "@optiaxiom/react/BlockGroup";
