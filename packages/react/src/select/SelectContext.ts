"use client";

import type { UseSelectReturnValue } from "downshift";
import type { FocusEventHandler, ReactNode, RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

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
   * Add secondary text after the label.
   */
  description?: string;
  /**
   * Provide a reason why item needs to be marked as disabled and skipped from keyboard navigation.
   */
  disabledReason?: string;
  /**
   * Provide an optional group that item belongs to.
   */
  group?: SelectOptionGroup;
  /**
   * String representation of items.
   */
  label: string;
  /**
   * Return a unique key for each item.
   */
  value: string;
};

type SelectOptionGroup = {
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

export const [SelectProvider, useSelectContext] = createContext<{
  disabled?: boolean;
  downshift: UseSelectReturnValue<SelectOption>;
  highlightedItem: SelectOption;
  highlightedItemRef: RefObject<HTMLElement>;
  isOpen: boolean | undefined;
  items: readonly SelectOption[] | SelectOption[];
  loading: boolean | undefined;
  onBlur: FocusEventHandler<HTMLElement> | undefined;
  selectedItem: SelectOption | undefined;
}>("@optiaxiom/react/Select");
