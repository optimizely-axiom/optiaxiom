import type { ReactNode } from "react";

import type { BlockActionElement } from "./types";

import { Button } from "../button";

export type BlockActionProps = Omit<
  BlockActionElement,
  "$type" | "children"
> & {
  /**
   * Button label content
   */
  children: ReactNode;
  /**
   * Callback when the action button is clicked
   */
  onClick?: () => void;
};

export function BlockAction({
  appearance = "primary-opal",
  children,
  name,
  onClick,
}: BlockActionProps) {
  return (
    <Button
      appearance={appearance}
      data-action-name={name}
      justifyContent="center"
      onClick={onClick}
      size="lg"
    >
      {children}
    </Button>
  );
}

BlockAction.displayName = "@optiaxiom/react/BlockAction";
