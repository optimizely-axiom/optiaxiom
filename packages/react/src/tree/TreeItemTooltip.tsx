import type { ReactNode } from "react";

import { ListboxItemTooltip } from "../listbox/ListboxItemTooltip";
import { Tooltip } from "../tooltip";

export type TreeItemTooltipProps = {
  children: ReactNode;
  /**
   * The item's disabled reason, already resolved.
   */
  disabledReason: string | undefined;
  /**
   * Whether the item's label is being renamed.
   */
  editing: boolean;
  /**
   * Whether the item has keyboard focus.
   */
  highlighted: boolean;
  /**
   * The item's full label.
   */
  label: string;
};

/**
 * A disabled item shows its reason, also while highlighted by keyboard. Any
 * other item shows its full label on hover while the label is truncated.
 */
export function TreeItemTooltip({
  children,
  disabledReason,
  editing,
  highlighted,
  label,
}: TreeItemTooltipProps) {
  return disabledReason ? (
    <ListboxItemTooltip content={disabledReason} highlighted={highlighted}>
      {children}
    </ListboxItemTooltip>
  ) : (
    <Tooltip auto content={label} disabled={editing} side="right">
      {children}
    </Tooltip>
  );
}

TreeItemTooltip.displayName = "@optiaxiom/react/TreeItemTooltip";
