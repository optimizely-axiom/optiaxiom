import type { ReactNode } from "react";

import { ListboxItemTooltip } from "../listbox/ListboxItemTooltip";
import { Tooltip } from "../tooltip";

export type TreeItemTooltipProps = {
  children: ReactNode;
  /**
   * Whether the full-label tooltip stays closed, e.g. while the label is
   * being renamed.
   */
  disabled: boolean;
  /**
   * The item's disabled reason, already resolved.
   */
  disabledReason: string | undefined;
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
  disabled,
  disabledReason,
  highlighted,
  label,
}: TreeItemTooltipProps) {
  return disabledReason ? (
    <ListboxItemTooltip content={disabledReason} highlighted={highlighted}>
      {children}
    </ListboxItemTooltip>
  ) : (
    <Tooltip auto content={label} disabled={disabled} side="right">
      {children}
    </Tooltip>
  );
}

TreeItemTooltip.displayName = "@optiaxiom/react/TreeItemTooltip";
