"use client";

import type { TreeController } from "@ui-sdk/react/tree";
import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

import type { MenuOption } from "../menu";
import type { MenuAnchorProps } from "../menu/internals";

import {
  resolveItemProperty,
  type SelectOption,
} from "../select/SelectContext";

export type TreeMenuAnchor = NonNullable<
  MenuAnchorProps["virtualRef"]["current"]
>;

export type TreeOption = Pick<
  SelectOption,
  "addon" | "description" | "detail" | "disabledReason"
> & {
  /**
   * The actions in the item's context menu, opened with Shift+F10, the Menu
   * key, a right-click or a long press. Takes the same options as `Menu`.
   * Pass a function to get `rename`, which starts editing the item's label.
   * Disabled items don't open their actions.
   */
  actions?: ((context: { rename: () => void }) => MenuOption[]) | MenuOption[];
  /**
   * The nested items. Leave it out for a leaf. Pass a function to load them
   * when the item first expands; it runs once, so pass an array for items
   * that change after they load.
   */
  children?: (() => Promise<TreeOption[]>) | TreeOption[];
  /**
   * Whether the item's label can be edited when the tree has
   * `onLabelChange`. Set `false` to keep this item's label fixed.
   */
  editable?: boolean;
  /**
   * The item's name, shown in its row. Screen readers announce it, and
   * typing jumps to the next item that starts with it.
   */
  label: string;
  /**
   * Identifies the item in `value`, `defaultValue`, `expanded` and the
   * handlers. Must be unique across the whole tree.
   */
  value: string;
};

/**
 * Whether users can rename `option`: the tree takes edits, and the item is
 * neither locked nor disabled.
 */
export const isEditable = (
  option: TreeOption,
  onLabelChange: ((value: string, label: string) => void) | undefined,
) =>
  Boolean(onLabelChange) &&
  option.editable !== false &&
  !resolveItemProperty(option.disabledReason);

export const [TreeProvider, useTreeContext] = createContext<{
  /**
   * Drives UI SDK's tree, e.g. to focus the item with the tab stop.
   */
  controller: TreeController;
  /**
   * The value of the item whose label is being edited, or `null`.
   */
  editing: null | string;
  /**
   * Children loaded so far for items whose `children` is a function.
   */
  loaded: Record<string, TreeOption[]>;
  /**
   * The context menu's anchor: the focused row, or the pointer.
   */
  menuAnchorRef: RefObject<TreeMenuAnchor>;
  /**
   * The item the context menu opened from, which takes focus back when it
   * closes.
   */
  menuItemRef: RefObject<HTMLElement>;
  /**
   * The latest request to open the context menu: which item, with its current
   * option, and whether the keyboard asked. Each request has a new `id`.
   */
  menuRequest:
    | undefined
    | {
        id: number;
        keyboard: boolean;
        option: TreeOption | undefined;
      };
  /**
   * Saves an edited label. Undefined when labels can't be edited.
   */
  onLabelChange: ((value: string, label: string) => void) | undefined;
  /**
   * Open the context menu of `option`, whose element is `item`, next to
   * `anchor`.
   */
  openMenu: (
    option: TreeOption,
    item: HTMLElement,
    anchor: TreeMenuAnchor,
    keyboard: boolean,
  ) => void;
  setEditing: (value: null | string) => void;
}>("@optiaxiom/react/Tree");
