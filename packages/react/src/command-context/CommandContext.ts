"use client";

import type { UseComboboxReturnValue } from "downshift";
import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from "react";

import { createContext } from "@radix-ui/react-context";

export type CommandOption = {
  addon?: ReactNode;
  description?: string;
  detail?: (context: { inputValue: string | undefined }) => string;
  /**
   * Provide a reason why item needs to be marked as disabled and skipped from keyboard navigation.
   */
  disabledReason?: (() => string) | string;
  /**
   * Handler that is called when an item is selected either via keyboard or mouse.
   */
  execute?: (context: { inputValue: string | undefined }) => void;
  group?: Group;
  keywords?: string;
  /**
   * Return a string representation of item.
   */
  label: ((context: { inputValue: string | undefined }) => string) | string;
  link?: string;
  /**
   * Whether item is multi-selectable.
   */
  multi?: boolean;
  parentItem?: CommandOption;
  /**
   * Return true if item need to be marked as selected.
   */
  selected?: (() => boolean) | boolean;
  subItems?: CommandOption[];
  type?: "action" | "checkbox" | "radio";
  visible?:
    | ((context: { inputValue: string | undefined }) => boolean | undefined)
    | boolean;
};

export type Group = {
  name: string;
  separator?: boolean;
  visible?: boolean;
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
  activePath: number[];
  downshift: UseComboboxReturnValue<CommandOption>;
  empty: ReactNode;
  highlightedItem: CommandOption | undefined;
  inputValue: string | undefined;
  items: CommandOption[] | readonly CommandOption[];
  loading: boolean | undefined;
  pauseInteractionRef: MutableRefObject<{
    timer: number | undefined;
    triangle: null | {
      bottom: { x: number; y: number };
      side: { x: number; y: number };
      top: { x: number; y: number };
    };
  }>;
  placed: boolean;
  setActivePath: Dispatch<SetStateAction<number[]>>;
  setHighlightedIndex: (index: number) => void;
  setInputValue: (value: string) => void;
  setPlaced: (placed: boolean) => void;
}>("@optiaxiom/react/Command");
