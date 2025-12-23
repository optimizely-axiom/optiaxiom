import type { ReactNode } from "react";

import type { BlockHeadingElement } from "./types";

import { Heading } from "../heading";

export type BlockHeadingProps = Omit<
  BlockHeadingElement,
  "$type" | "children"
> & {
  /**
   * Heading content
   */
  children: ReactNode;
};

export function BlockHeading({ children, level = 2 }: BlockHeadingProps) {
  return (
    <Heading level={String(level) as "1" | "2" | "3" | "4"}>{children}</Heading>
  );
}

BlockHeading.displayName = "@optiaxiom/react/BlockHeading";
