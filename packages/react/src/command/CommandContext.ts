"use client";

import type { UseComboboxReturnValue } from "downshift";
import type { MutableRefObject, ReactNode, RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

import type { useTimeout } from "../hooks";

export type CommandOption = {
  /**
   * Images, icons, or avatars to be displayed before the item label.
   */
  addon?:
    | ((context: { inputValue: string | undefined }) => ReactNode)
    | ReactNode;
  /**
   * Add secondary text after the label.
   */
  description?:
    | ((context: { inputValue: string | undefined }) => ReactNode)
    | ReactNode;
  /**
   * Secondary text displayed next to the label.
   */
  detail?:
    | ((context: { inputValue: string | undefined }) => ReactNode)
    | ReactNode;
  /**
   * Mark the item as disabled and show the reason in a tooltip. The item can
   * still be reached by keyboard, but not selected.
   */
  disabledReason?: (() => string) | string;
  /**
   * Handler that is called when an item is selected either via keyboard or mouse.
   */
  execute?: (context: {
    dismiss: boolean;
    inputValue: string | undefined;
  }) => void;
  /**
   * Shows an external link icon and sets the correct rel/target attributes if `href` is also passed.
   */
  external?: boolean;
  /**
   * Group item belongs to.
   */
  group?: CommandOptionGroup;
  hiddenInSearchContext?: boolean;
  /**
   * Render a link with the given value as the `href` attribute. Clicking or
   * pressing Enter follows the link. If `execute` is also set, clicking and
   * Enter run `execute` instead, while Cmd+click and Shift+click still open
   * the link natively, e.g. in a new tab.
   */
  href?: string;
  /**
   * Control the appearance by selecting between the different item types.
   */
  intent?: "danger" | "neutral";
  /**
   * A unique key for the item, used to track its row. Defaults to the label, so pass a unique `key` whenever labels can repeat (e.g. options built from data).
   */
  key?: string;
  /**
   * Additional text to use for filtering items based on input value.
   */
  keywords?: string;
  /**
   * Return a string representation of item.
   */
  label: ((context: { inputValue: string | undefined }) => string) | string;
  /**
   * Whether item is multi-selectable.
   */
  multi?: boolean;
  /**
   * @private
   */
  parentOption?: CommandOption;
  /**
   * Return true if item needs to be marked as selected.
   */
  selected?: (() => boolean) | boolean;
  /**
   * Exclude this item from match scoring. Menu sorts matching items by how
   * closely their label (or `keywords`) matches the typed text; set this on
   * every item whose order already means something, such as results ranked
   * by a search API (together with `visible: true`). Group `priority` still
   * applies.
   */
  skipFilterScoring?: boolean;
  /**
   * Nested menu items (same shape as the top-level options) displayed
   * as a sub-menu when this item is selected.
   */
  subOptions?:
    | ((context: { inputValue: string | undefined }) => CommandOption[])
    | CommandOption[];
  /**
   * Allow filtering through sub-options independent of the parent menu.
   */
  subOptionsInputVisible?: boolean;
  /**
   * Optional Surface tracking configuration for App Companion integration.
   * When provided, this menu item becomes a trackable surface that emits
   * interaction events based on the item's behavior.
   */
  surface?: {
    /** Optional metadata about this interaction */
    data?: Record<string, unknown>;
    /**
     * Surface name used in the surface path.
     * For properties: the property name (e.g., "status", "priority", "assignee")
     * For interactions: the action name (e.g., "archived", "deleted", "pinned")
     */
    name: string;
  } & (
    | {
        /** Surface type for custom interactions on parent surface */
        type: "action";
      }
    | {
        /** Surface type for state changes (selections, toggles) */
        type: "property";
        /**
         * The value this menu item represents.
         * For radio/select items: The value that gets tracked when this item is selected
         * For toggles: The value is still required but only used for suggestion matching
         */
        value: unknown;
      }
  );
  /**
   * Whether to show a switch toggle instead of a check mark.
   */
  switch?: boolean;
  /**
   * Override the default filtering logic and fully control when an item is
   * visible based on the current inputValue. Set `true` for options you
   * already filtered yourself, such as results loaded as the user types.
   * Matching items are still sorted by match score unless
   * `skipFilterScoring` is set.
   */
  visible?:
    | ((context: { inputValue: string | undefined }) => boolean | undefined)
    | boolean;
};

type CommandOptionGroup = {
  /**
   * Whether to hide the group label.
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
   * Whether to show separators around the whole group.
   */
  separator?: boolean;
};

export function resolveItemProperty<Value>(
  property: Value,
  ...context: Value extends (...context: infer Context) => unknown
    ? Context
    : never
) {
  return (
    typeof property === "function" ? property(...context) : property
  ) as Value extends (...args: never) => unknown ? ReturnType<Value> : Value;
}

export const [CommandProvider, useCommandContext] = createContext<{
  downshift: UseComboboxReturnValue<CommandOption>;
  empty: ReactNode;
  enabled: boolean;
  highlightedItem: CommandOption | undefined;
  highlightedItemRef: RefObject<HTMLElement>;
  inputValue: string | undefined;
  items: CommandOption[] | readonly CommandOption[];
  loading: "both" | "skeleton" | "spinner" | boolean | undefined;
  pauseInteractionRef: MutableRefObject<{
    isInsideTriangle: ((target: { x: number; y: number }) => boolean) | null;
  }>;
  pauseInteractionTimeout: ReturnType<typeof useTimeout>;
  setHighlightedIndex: (index: number) => void;
  setInputValue: (value: string) => void;
}>("@optiaxiom/react/Command");
