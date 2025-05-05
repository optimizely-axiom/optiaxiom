"use client";

import type { UseComboboxReturnValue } from "downshift";
import type { MutableRefObject, ReactNode } from "react";

import { createContext } from "@radix-ui/react-context";

export type CommandOption = {
  /**
   * Images, icons, or avatars to be displayed before the item label.
   */
  addon?: ReactNode;
  /**
   * Additional description on second line after the label.
   */
  description?: string;
  /**
   * Secondary text displayed next to the label.
   */
  detail?: (context: { inputValue: string | undefined }) => string;
  /**
   * Provide a reason why item needs to be marked as disabled and skipped from keyboard navigation.
   */
  disabledReason?: (() => string) | string;
  /**
   * Handler that is called when an item is selected either via keyboard or mouse.
   */
  execute?: (context: { inputValue: string | undefined }) => void;
  /**
   * Group item belongs to.
   */
  group?: CommandOptionGroup;
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
   * Render a link with the given value as the `href` attribute.
   */
  link?: string;
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
   * An array of sub items that will be displayed in a nested menu.
   */
  subOptions?: CommandOption[];
  /**
   * Override the default filtering logic and fully control when an item is
   * visible based on the current inputValue.
   */
  visible?:
    | ((context: { inputValue: string | undefined }) => boolean | undefined)
    | boolean;
};

type CommandOptionGroup = {
  hidden?: boolean;
  name: string;
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
  highlightedItem: CommandOption | undefined;
  inputValue: string | undefined;
  items: CommandOption[] | readonly CommandOption[];
  loading: boolean | undefined;
  pauseInteractionRef: MutableRefObject<{
    isInsideTriangle: ((target: { x: number; y: number }) => boolean) | null;
    timer: number | undefined;
  }>;
  setHighlightedIndex: (index: number) => void;
  setInputValue: (value: string) => void;
}>("@optiaxiom/react/Command");
