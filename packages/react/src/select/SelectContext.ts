"use client";

import type { UseSelectReturnValue } from "downshift";
import type {
  Dispatch,
  FocusEventHandler,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";

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
  description?: ReactNode;
  /**
   * Secondary text displayed next to the label.
   */
  detail?: ReactNode;
  /**
   * Mark the item as disabled and show the reason in a tooltip. The item can
   * still be reached by keyboard, but not selected.
   */
  disabledReason?: (() => string) | string;
  /**
   * Provide an optional group that item belongs to.
   */
  group?: SelectOptionGroup;
  /**
   * String representation of items.
   */
  label: string;
  /**
   * The value submitted with the form and passed to `onValueChange`. Must be
   * unique.
   *
   * Use `""` for a "none" option: selecting it clears the value, so the
   * trigger shows its `placeholder` and `required` treats the field as empty.
   * Give the option a non-empty value (e.g. `"all"`) when its label should
   * show in the trigger, such as an "All" filter.
   */
  value: string;
};

type SelectOptionGroup = {
  /**
   * Whether the group label should be hidden or not.
   */
  hidden?: boolean;
  /**
   * The group's heading, which also identifies the group: neighbouring items
   * whose groups share a `label` render under one heading, even when the group
   * objects differ. Give distinct groups distinct labels, and keep a group's
   * items next to each other in `options`.
   */
  label: string;
  /**
   * The sorting priority of the group (default: 0).
   * Groups with higher priority are sorted first.
   */
  priority?: number;
  /**
   * Whether to display a separator before this group.
   */
  separator?: boolean;
};

export const resolveItemProperty = <Value>(
  property: Value,
  ...context: Value extends (...context: infer Context) => unknown
    ? Context
    : never
) =>
  (typeof property === "function"
    ? property(...context)
    : property) as Value extends (...args: never) => unknown
    ? ReturnType<Value>
    : Value;

export const [SelectProvider, useSelectContext] = createContext<{
  disabled?: boolean;
  downshift: UseSelectReturnValue<SelectOption>;
  focusVisible: boolean;
  highlightedItem: SelectOption;
  highlightedItemRef: RefObject<HTMLElement>;
  isOpen: boolean | undefined;
  items: readonly SelectOption[] | SelectOption[];
  loading: boolean | undefined;
  onBlur: FocusEventHandler<HTMLElement> | undefined;
  selectedItem: SelectOption | undefined;
  setFocusVisible: Dispatch<SetStateAction<boolean>>;
  toggleButtonId: string;
  triggerRef: RefObject<HTMLButtonElement>;
}>("@optiaxiom/react/Select");
