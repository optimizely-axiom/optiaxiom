import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  createTreeController,
  type TreeItemData,
  Tree as UiTree,
} from "@ui-sdk/react/tree";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

import { Box, type BoxProps } from "../box";
import { useMessages } from "../locale";
import { resolveItemProperty } from "../select/SelectContext";
import {
  moreParentOf,
  moreValueOf,
  type TreeLevel,
  type TreeMenuAnchor,
  type TreeOption,
  type TreePage,
  TreeProvider,
} from "./TreeContext";
import { TreeItem } from "./TreeItem";
import { TreeMenu } from "./TreeMenu";

export type TreeProps = BoxProps<
  "div",
  {
    children?: never;
    /**
     * The values of the items expanded at first, in uncontrolled mode.
     */
    defaultExpanded?: string[];
    /**
     * The values of the items selected at first, in uncontrolled mode.
     */
    defaultValue?: string[];
    /**
     * The values of the expanded items, in controlled mode.
     */
    expanded?: string[];
    /**
     * Whether more than one item can be selected. Shift+Arrow and Shift+click
     * extend the selection, and Ctrl/Cmd+A selects every visible item, or
     * clears the selection when every item is selected.
     */
    multiple?: boolean;
    /**
     * Handler that is called when items expand or collapse.
     */
    onExpandedChange?: (expanded: string[]) => void;
    /**
     * Handler that is called with an item's edited label. Setting it lets
     * users rename items in place: F2 or a double-click starts editing,
     * Enter or leaving the field saves, and Escape cancels. Items with
     * `editable: false` keep their label.
     */
    onLabelChange?: (value: string, label: string) => void;
    /**
     * Handler that is called when the selection changes. It receives at most
     * one value unless `multiple` is set.
     */
    onValueChange?: (value: string[]) => void;
    /**
     * The items to render, each with its nested items in `children`.
     */
    options: readonly TreeOption[] | TreeOption[];
    /**
     * The values of the selected items, in controlled mode.
     */
    value?: string[];
  }
>;

/**
 * Hierarchical list of items that expand and collapse, such as pages or
 * folders.
 *
 * The tree is one tab stop: arrow keys move between items, Right and Left
 * expand and collapse, and typing a letter jumps to the next item that starts
 * with it. An item's `actions` open in a context menu from its "…" button,
 * Shift+F10, the Menu key, a right-click or a long press.
 *
 * @category navigation
 * @since 3.7.0
 * @experimental
 */
export const Tree = forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      defaultExpanded,
      defaultValue,
      expanded: expandedProp,
      multiple,
      onExpandedChange,
      onLabelChange,
      onValueChange,
      options,
      value: valueProp,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/Tree",
      defaultProp: defaultValue ?? [],
      onChange: onValueChange,
      prop: valueProp,
    });
    const [expanded, setExpanded] = useControllableState({
      caller: "@optiaxiom/react/Tree",
      defaultProp: defaultExpanded ?? [],
      onChange: onExpandedChange,
      prop: expandedProp,
    });

    const [editing, setEditing] = useState<null | string>(null);

    const messages = useMessages();

    const [loaded, setLoaded] = useState<Record<string, TreeLevel>>({});
    const [loadingMore, setLoadingMore] = useState<Record<string, true>>({});
    /**
     * `items` is the same structure as data. Rows render from `options`, but
     * UI SDK works out levels and positions from data before the page mounts,
     * so server-rendered rows match. A branch whose children haven't loaded
     * is an empty array, and one with more pages ends in the item that
     * loads the next one.
     */
    const { items, optionsByValue } = useMemo(() => {
      const optionsByValue = new Map<string, TreeOption>();
      const toData = (option: TreeOption): TreeItemData => {
        optionsByValue.set(option.value, option);
        const page = loaded[option.value];
        return {
          children: Array.isArray(option.children)
            ? option.children.map(toData)
            : option.children && [
                ...(page?.options ?? []).map(toData),
                ...(page?.nextPageParam === undefined
                  ? []
                  : [
                      {
                        label: page.nextPageLabel ?? "",
                        value: moreValueOf(option.value),
                      },
                    ]),
              ],
          disabled: Boolean(resolveItemProperty(option.disabledReason)),
          label: option.label,
          value: option.value,
        };
      };
      return { items: options.map(toData), optionsByValue };
    }, [loaded, options]);

    const [controller] = useState(createTreeController);

    /**
     * UI SDK loads a branch's children only as it expands, so a lazy branch
     * that starts out expanded would stay empty. It's held back from UI SDK
     * and expanded through it once, which loads it with a spinner.
     */
    const unloaded = expanded.filter(
      (key) =>
        typeof optionsByValue.get(key)?.children === "function" && !loaded[key],
    );
    const requestedRef = useRef(new Set<string>());
    useEffect(() => {
      for (const key of unloaded) {
        if (!requestedRef.current.has(key)) {
          requestedRef.current.add(key);
          controller.expand(key);
        }
      }
    });

    /**
     * The item to focus once the next page renders: the first new item, as
     * the item that loads the next page, which had focus, moves to the end
     * or goes away.
     */
    const focusAfterLoadRef = useRef<string>();
    useEffect(() => {
      if (focusAfterLoadRef.current) {
        controller.focus(focusAfterLoadRef.current);
        focusAfterLoadRef.current = undefined;
      }
    }, [controller, loaded]);

    const loadMore = (key: string) => {
      const children = optionsByValue.get(key)?.children;
      const pageParam = loaded[key]?.nextPageParam;
      if (typeof children !== "function" || pageParam === undefined) {
        return;
      }

      setLoadingMore((loading) => ({ ...loading, [key]: true }));
      const done = () => setLoadingMore(({ [key]: _, ...loading }) => loading);
      // A rejected page leaves the item in place: pressing it again retries.
      return children({ pageParam }).then((result) => {
        const page = toPage(result);
        focusAfterLoadRef.current = page.options[0]?.value ?? key;
        setLoaded((loaded) => ({
          ...loaded,
          [key]: {
            nextPageLabel: page.nextPageLabel,
            nextPageParam: page.nextPageParam,
            options: [...(loaded[key]?.options ?? []), ...page.options],
          },
        }));
        done();
      }, done);
    };

    const [menuRequest, setMenuRequest] = useState<{
      id: number;
      keyboard: boolean;
      open: boolean;
      value: string;
    }>();
    const menuAnchorRef = useRef<TreeMenuAnchor>({
      getBoundingClientRect: () => new DOMRect(),
    });
    const menuItemRef = useRef<HTMLElement | null>(null);

    return (
      <TreeProvider
        controller={controller}
        editing={editing}
        loaded={loaded}
        loadingMore={loadingMore}
        loadMore={loadMore}
        menuAnchorRef={menuAnchorRef}
        menuItemRef={menuItemRef}
        menuRequest={
          menuRequest && {
            ...menuRequest,
            option: optionsByValue.get(menuRequest.value),
          }
        }
        onLabelChange={onLabelChange}
        onMenuClose={() =>
          setMenuRequest((request) => request && { ...request, open: false })
        }
        openMenu={(option, item, anchor, keyboard) => {
          menuAnchorRef.current = anchor;
          menuItemRef.current = item;
          setMenuRequest((request) => ({
            id: (request?.id ?? 0) + 1,
            keyboard,
            open: true,
            value: option.value,
          }));
        }}
        setEditing={setEditing}
      >
        <UiTree
          announcement={({ type }) =>
            type === "expanded"
              ? messages.Expanded
              : type === "collapsed"
                ? messages.Collapsed
                : type === "loading"
                  ? messages.Loading
                  : /**
                     * Not "load-failed": the consumer reports failures as it
                     * chooses, such as with a toast from `children`.
                     */
                    null
          }
          controller={controller}
          expanded={expanded.filter((key) => !unloaded.includes(key))}
          // Pressing a row selects it; its chevron expands it.
          expandOnPress={false}
          items={items}
          loadChildren={(key) => {
            const children = optionsByValue.get(key)?.children;
            // Return nothing for children already there, so their branch
            // expands at once without a loading state.
            if (typeof children !== "function") {
              return;
            }

            // A rejection leaves the branch collapsed, and UI SDK loads it
            // again on the next expand.
            return children({ pageParam: undefined }).then((result) =>
              setLoaded((loaded) => ({ ...loaded, [key]: toPage(result) })),
            );
          }}
          mode={multiple ? "multiple" : "single"}
          onAction={(value) => {
            const parent = moreParentOf(value);
            return parent === undefined ? undefined : loadMore(parent);
          }}
          onExpandedChange={(next) =>
            // Keeps held-back branches expanded while they load.
            setExpanded([
              ...next,
              ...unloaded.filter((key) => !next.includes(key)),
            ])
          }
          onValueChange={(value, details) => {
            const values = Array.isArray(value)
              ? value
              : value === null
                ? []
                : [value];
            // Next-page items run their action instead of being selected.
            const options = values.filter(
              (value) => moreParentOf(value) === undefined,
            );
            if (options.length < values.length && !multiple) {
              details.cancel();
              return;
            }
            setValue(options);
          }}
          pendingAnnouncement={messages.Loading}
          render={
            <Box
              display="flex"
              flexDirection="column"
              gap="2"
              ref={ref}
              {...props}
            />
          }
          value={multiple ? value : (value[0] ?? null)}
        >
          {options.map((option) => (
            <TreeItem key={option.value} option={option} />
          ))}
        </UiTree>

        <TreeMenu />
      </TreeProvider>
    );
  },
);

Tree.displayName = "@optiaxiom/react/Tree";

const toPage = (result: TreeOption[] | TreePage): TreeLevel =>
  Array.isArray(result) ? { options: result } : result;
