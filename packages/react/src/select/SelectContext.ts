"use client";

import type { UseSelectReturnValue } from "downshift";
import type { FocusEventHandler, ReactNode } from "react";

import { Context } from "radix-ui/internal";

export type Group = {
  /**
   * Whether the group label should be hidden or not.
   */
  hidden?: boolean;
  /**
   * The label group.
   */
  label: string;
  /**
   * Whether to display a separator before this group.
   */
  separator?: boolean;
};

export type SelectOption = {
  /**
   * Addons such as avatars or icons to show beside each item label.
   */
  addon?: ReactNode;
  /**
   * Override the ARIA label of the current element.
   */
  ["aria-label"]?: string;
  /**
   * Description to show under each item label.
   */
  description?: string;
  /**
   * Provide a reason why item needs to be marked as disabled and skipped from keyboard navigation.
   */
  disabledReason?: string;
  /**
   * Provide an optional group that item belongs to.
   */
  group?: Group;
  /**
   * String representation of items.
   */
  label: string;
  /**
   * Return a unique key for each item.
   */
  value: string;
};

export const [SelectProvider, useSelectContext] = Context.createContext<{
  disabled?: boolean;
  downshift: UseSelectReturnValue<SelectOption>;
  highlightedItem: SelectOption;
  isOpen: boolean | undefined;
  items: readonly SelectOption[] | SelectOption[];
  loading: boolean | undefined;
  onBlur: FocusEventHandler<HTMLElement> | undefined;
  selectedItem: SelectOption | undefined;
}>("@optiaxiom/react/Select");
