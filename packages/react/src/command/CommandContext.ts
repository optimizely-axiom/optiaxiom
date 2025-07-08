"use client";

import type { UseComboboxReturnValue } from "downshift";
import type { MutableRefObject, ReactNode, RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

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
  detail?: ((context: { inputValue: string | undefined }) => string) | string;
  /**
   * Provide a reason why item needs to be marked as disabled and skipped from keyboard navigation.
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
   * Group item belongs to.
   */
  group?: CommandOptionGroup;
  hiddenInSearchContext?: boolean;
  /**
   * Render a link with the given value as the `href` attribute.
   */
  href?: string;
  /**
   * Control the appearance by selecting between the different item types.
   */
  intent?: "danger" | "neutral";
  /**
   * Return a unique key for each item (otherwise label is used).
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
   * Whether to skip scoring when filtering and sorting by the score.
   */
  skipFilterScoring?: boolean;
  /**
   * An array of sub items that will be displayed in a nested menu.
   */
  subOptions?:
    | ((context: { inputValue: string | undefined }) => CommandOption[])
    | CommandOption[];
  /**
   * Allow filtering through sub-options independent of the parent menu.
   */
  subOptionsInputVisible?: boolean;
  /**
   * Whether to show a switch toggle instead of a check mark.
   */
  switch?: boolean;
  /**
   * Override the default filtering logic and fully control when an item is
   * visible based on the current inputValue.
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
   * Return a string representation of the group.
   */
  label: string;
  /**
   * The sorting priority of the group (default: 0).
   */
  priority?: number;
  /**
   * Whether to show separators around the whole group.
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

export const [CommandProvider, useCommandContext] = createContext<{
  downshift: UseComboboxReturnValue<CommandOption>;
  empty: ReactNode;
  enabled: boolean;
  highlightedItem: CommandOption | undefined;
  highlightedItemRef: RefObject<HTMLElement>;
  inputValue: string | undefined;
  items: CommandOption[] | readonly CommandOption[];
  loading: "both" | "placeholder" | "spinner" | boolean | undefined;
  pauseInteractionRef: MutableRefObject<{
    isInsideTriangle: ((target: { x: number; y: number }) => boolean) | null;
    timer: number | undefined;
  }>;
  setHighlightedIndex: (index: number) => void;
  setInputValue: (value: string) => void;
}>("@optiaxiom/react/Command");
