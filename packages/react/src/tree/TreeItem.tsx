import { IconChevronRight } from "@optiaxiom/icons/IconChevronRight";
import { useId } from "@radix-ui/react-id";
import {
  TreeGroup as UiTreeGroup,
  TreeItem as UiTreeItem,
  TreeItemIndicator as UiTreeItemIndicator,
  TreeItemLabel as UiTreeItemLabel,
} from "@ui-sdk/react/tree";
import { useRef, useState } from "react";

import { Box } from "../box";
import { EllipsisMenuButton } from "../ellipsis-menu-button";
import { useTimeout } from "../hooks";
import { HoverCardAnchorProvider } from "../hover-card/HoverCardContext";
import { useMessages } from "../locale";
import { resolveItemProperty } from "../select/SelectContext";
import { Spinner } from "../spinner";
import { Text } from "../text";
import { TransitionGlobalConfig } from "../transition";
import { isEditable, type TreeOption, useTreeContext } from "./TreeContext";
import * as styles from "./TreeItem.css";
import { TreeItemEditor } from "./TreeItemEditor";
import { TreeItemTooltip } from "./TreeItemTooltip";
import { TreeLoadMore } from "./TreeLoadMore";

export type TreeItemProps = {
  /**
   * The item to render, with its nested items.
   */
  option: TreeOption;
};

// Items nest, so an event in a child item bubbles through its parents. Only
// the item it started in handles it.
const ownEvent = (event: { currentTarget: Element; target: EventTarget }) =>
  event.target instanceof Element &&
  event.target.closest('[role="treeitem"]') === event.currentTarget;

const at = (x: number, y: number) => ({
  getBoundingClientRect: () => new DOMRect(x, y, 0, 0),
});

/**
 * How long a touch press is held to open an item's actions, and how far it
 * may drift before it counts as a scroll.
 */
const longPressDelay = 500;
const longPressSlop = 10;

export function TreeItem({ option }: TreeItemProps) {
  const { editing, loaded, menuRequest, onLabelChange, openMenu, setEditing } =
    useTreeContext("@optiaxiom/react/TreeItem");
  const menuOpen = Boolean(
    menuRequest?.open && menuRequest.option?.value === option.value,
  );
  // Whether the menu was open when the actions button was pressed: the press
  // closes it first, as a click outside it, so the click mustn't reopen it.
  const menuWasOpenRef = useRef(false);
  const messages = useMessages();
  const isEditing = editing === option.value;
  const canEdit = isEditable(option, onLabelChange);
  const rowRef = useRef<HTMLDivElement>(null);
  const detailId = useId();
  const addonAfterId = useId();
  const [focused, setFocused] = useState(false);
  const [addonHovered, setAddonHovered] = useState(false);

  /**
   * iOS Safari fires no `contextmenu` on a long press, so touch and pen
   * presses held still open the actions themselves.
   */
  const longPress = useTimeout();
  const pressRef = useRef<{ x: number; y: number }>();
  const longPressedRef = useRef(false);
  const cancelLongPress = () => {
    pressRef.current = undefined;
    longPress.clear();
  };

  const children =
    typeof option.children === "function"
      ? loaded[option.value]?.options
      : option.children;
  const disabledReason = resolveItemProperty(option.disabledReason);
  const hasActions =
    !disabledReason &&
    (typeof option.actions === "function" || Boolean(option.actions?.length));

  return (
    <UiTreeItem
      branch={option.children !== undefined}
      disabled={Boolean(disabledReason)}
      label={option.label}
      render={
        <Box
          aria-describedby={
            [
              option.detail ? detailId : undefined,
              option.addonAfter ? addonAfterId : undefined,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-haspopup={hasActions ? "dialog" : undefined}
          aria-keyshortcuts={hasActions ? "Shift+F10" : undefined}
          {...styles.item()}
          onBlur={(event) => {
            if (ownEvent(event)) {
              setFocused(false);
            }
          }}
          onClick={(event) => {
            // The click that ends a long press doesn't select the item too.
            if (longPressedRef.current && ownEvent(event)) {
              longPressedRef.current = false;
              event.preventDefault();
            }
          }}
          onContextMenu={(event) => {
            if (!hasActions || !ownEvent(event)) {
              return;
            }

            event.preventDefault();
            // Android fires its own `contextmenu` on a long press: whichever
            // comes first opens the menu, once.
            if (longPressedRef.current) {
              return;
            }
            cancelLongPress();
            openMenu(
              option,
              event.currentTarget,
              at(event.clientX, event.clientY),
              false,
            );
          }}
          onFocus={(event) => {
            if (ownEvent(event)) {
              setFocused(true);
            }
          }}
          onKeyDown={(event) => {
            if (
              event.key === "F2" &&
              !event.shiftKey &&
              canEdit &&
              ownEvent(event)
            ) {
              event.preventDefault();
              setEditing(option.value);
              return;
            }
            if (
              !hasActions ||
              !ownEvent(event) ||
              !(
                event.key === "ContextMenu" ||
                (event.key === "F10" && event.shiftKey)
              )
            ) {
              return;
            }

            // Also stops the browser firing its own `contextmenu` event.
            event.preventDefault();
            if (rowRef.current) {
              openMenu(option, event.currentTarget, rowRef.current, true);
            }
          }}
          onPointerCancel={cancelLongPress}
          onPointerDown={(event) => {
            longPressedRef.current = false;
            if (
              !hasActions ||
              !ownEvent(event) ||
              event.pointerType === "mouse"
            ) {
              return;
            }

            const item = event.currentTarget;
            const { clientX: x, clientY: y } = event;
            pressRef.current = { x, y };
            longPress.start(() => {
              pressRef.current = undefined;
              longPressedRef.current = true;
              openMenu(option, item, at(x, y), false);
            }, longPressDelay);
          }}
          onPointerMove={(event) => {
            const press = pressRef.current;
            if (
              press &&
              Math.hypot(event.clientX - press.x, event.clientY - press.y) >
                longPressSlop
            ) {
              cancelLongPress();
            }
          }}
          onPointerUp={cancelLongPress}
          onTouchEnd={(event) => {
            // Browsers follow a touch with `mousedown` and `click`, which
            // would dismiss the menu the long press just opened.
            if (longPressedRef.current && ownEvent(event)) {
              event.preventDefault();
            }
          }}
        />
      }
      value={option.value}
    >
      <TreeItemTooltip
        /**
         * The pointer on the end addon isn't on the label, and the addon's
         * own tooltips and hover cards would open over the label's.
         */
        disabled={isEditing || addonHovered}
        disabledReason={disabledReason}
        highlighted={focused}
        label={option.label}
      >
        <Box
          onDoubleClick={() => {
            if (canEdit) {
              setEditing(option.value);
            }
          }}
          ref={rowRef}
          {...styles.row({ editing: isEditing })}
        >
          <Box alignItems="center" display="flex" flex="none" size="sm">
            {option.children !== undefined && (
              <UiTreeItemIndicator render={<Box {...styles.indicator()} />}>
                {(state) =>
                  state.loading ? <Spinner size="2xs" /> : <IconChevronRight />
                }
              </UiTreeItemIndicator>
            )}
          </Box>

          {option.icon && <Box {...styles.icon()}>{option.icon}</Box>}

          {isEditing ? (
            <TreeItemEditor
              label={option.label}
              onDone={(label, refocus) => {
                setEditing(null);
                if (label !== undefined && label !== option.label) {
                  onLabelChange?.(option.value, label);
                }
                // Enter and Escape hand focus back to the item, as after a
                // menu.
                if (refocus) {
                  rowRef.current
                    ?.closest<HTMLElement>('[role="treeitem"]')
                    ?.focus();
                }
              }}
            />
          ) : (
            /* The item's accessible name: the label alone. */
            <UiTreeItemLabel
              render={
                <Text asChild truncate>
                  <span>{option.label}</span>
                </Text>
              }
            />
          )}

          {option.detail && (
            <Box color="fg.secondary" display="flex" flex="none" id={detailId}>
              {option.detail}
            </Box>
          )}

          {option.addonAfter && (
            <Box
              id={addonAfterId}
              onPointerEnter={() => setAddonHovered(true)}
              onPointerLeave={() => setAddonHovered(false)}
              {...styles.addonAfter()}
            >
              {/* A hover card here opens beside the whole row. */}
              <HoverCardAnchorProvider anchorRef={rowRef}>
                {option.addonAfter}
              </HoverCardAnchorProvider>
            </Box>
          )}

          {hasActions && !isEditing && (
            /**
             * A shortcut for pointer users to the menu the keyboard opens
             * with Shift+F10, which the item announces, so it stays out of
             * the accessibility tree and the tab order.
             */
            <Box aria-hidden {...styles.actions({ open: menuOpen })}>
              <EllipsisMenuButton
                appearance="subtle"
                aria-label={messages.Menu}
                onClick={(event) => {
                  /**
                   * UI SDK skips a prevented click, so the item isn't
                   * selected. Not `stopPropagation`: a click that never
                   * reaches the document doesn't dismiss the open menu.
                   */
                  event.preventDefault();
                  const item =
                    event.currentTarget.closest<HTMLElement>(
                      '[role="treeitem"]',
                    );
                  if (item && !menuWasOpenRef.current) {
                    openMenu(option, item, event.currentTarget, false);
                  }
                }}
                onDoubleClick={(event) => event.stopPropagation()}
                // Keeps focus on the item.
                onMouseDown={(event) => event.preventDefault()}
                onPointerDown={() => {
                  menuWasOpenRef.current = menuOpen;
                }}
                size="sm"
                tabIndex={-1}
              />
            </Box>
          )}
        </Box>
      </TreeItemTooltip>

      {children && (
        <UiTreeGroup
          render={
            <Box
              {...styles.group({
                animated: !TransitionGlobalConfig.skipAnimations,
              })}
            />
          }
        >
          {children.map((child) => (
            <TreeItem key={child.value} option={child} />
          ))}

          {loaded[option.value]?.nextPageParam !== undefined && (
            <TreeLoadMore parent={option} />
          )}
        </UiTreeGroup>
      )}
    </UiTreeItem>
  );
}

TreeItem.displayName = "@optiaxiom/react/TreeItem";
