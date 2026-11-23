"use client";

import type { TreeController } from "@ui-sdk/react/tree";
import type { ReactNode, RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

import type { MenuOption } from "../menu";
import type { MenuAnchorProps } from "../menu/internals";

import {
  resolveItemProperty,
  type SelectOption,
} from "../select/SelectContext";

/**
 * A level's items loaded so far. A level loaded from an array has no next
 * page.
 */
export type TreeLevel = Partial<
  Pick<TreePage, "nextPageLabel" | "nextPageParam">
> &
  Pick<TreePage, "options">;

export type TreeMenuAnchor = NonNullable<
  MenuAnchorProps["virtualRef"]["current"]
>;

export type TreeOption = {
  /**
   * The actions in the item's context menu, opened from its "…" button,
   * Shift+F10, the Menu key, a right-click or a long press. Takes the same
   * options as `Menu`.
   * Pass a function to get `rename`, which starts editing the item's label.
   * Disabled items don't open their actions.
   */
  actions?: ((context: { rename: () => void }) => MenuOption[]) | MenuOption[];
  /**
   * The nested items. Leave it out for a leaf. Pass a function to load them
   * when the item first expands; it runs once, so pass an array for items
   * that change after they load. To load them a page at a time, return
   * `{ nextPageLabel, nextPageParam, options }`: an item labelled
   * `nextPageLabel` ends the level and calls the function again with that
   * `pageParam`, until `nextPageParam` is undefined. If the promise rejects, nothing changes, so the next expand or
   * press tries again; report the error from the function if you want to.
   */
  children?:
    | ((context: {
        pageParam: TreePageParam | undefined;
      }) => Promise<TreeOption[] | TreePage>)
    | TreeOption[];
  /**
   * Whether the item's label can be edited when the tree has
   * `onLabelChange`. Set `false` to keep this item's label fixed.
   */
  editable?: boolean;
  /**
   * An icon to show before the item label.
   */
  icon?: ReactNode;
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
} & Pick<SelectOption, "description" | "detail" | "disabledReason">;

/**
 * One page of a level's items, and how to ask for the next one.
 */
export type TreePage = {
  /**
   * The label of the item that loads the next page, such as "Load more
   * posts". It shows while `nextPageParam` is set.
   */
  nextPageLabel: string;
  /**
   * Passed to `children` to load the next page. Leave it out on the last
   * page.
   */
  nextPageParam?: TreePageParam;
  /**
   * The items on this page.
   */
  options: TreeOption[];
};

/**
 * Identifies the next page of a level, such as a page index or a cursor.
 */
export type TreePageParam = number | string;

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
   * Children loaded so far for items whose `children` is a function, and
   * the param of their next page.
   */
  loaded: Record<string, TreeLevel>;
  /**
   * Items whose next page is loading.
   */
  loadingMore: Record<string, true>;
  /**
   * Starts loading the next page of an item's children.
   */
  loadMore: (value: string) => Promise<void> | undefined;
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
        open: boolean;
        option: TreeOption | undefined;
      };
  /**
   * Saves an edited label. Undefined when labels can't be edited.
   */
  onLabelChange: ((value: string, label: string) => void) | undefined;
  /**
   * Notes that the context menu closed.
   */
  onMenuClose: () => void;
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

const moreValuePrefix = "\u0000more\u0000";

/**
 * The value of the next-page item that ends a level: one no option can
 * have, so it never mixes with consumers' values.
 */
export const moreValueOf = (value: string) => `${moreValuePrefix}${value}`;

/**
 * The value of the item whose children a next-page item loads, or
 * undefined for any other value.
 */
export const moreParentOf = (value: string) =>
  value.startsWith(moreValuePrefix)
    ? value.slice(moreValuePrefix.length)
    : undefined;
