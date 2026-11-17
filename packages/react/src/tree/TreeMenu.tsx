import { Menu, MenuContent } from "../menu";
import { MenuAnchor } from "../menu/internals";
import { resolveItemProperty } from "../select/SelectContext";
import { isEditable, useTreeContext } from "./TreeContext";

/**
 * The context menu of the item it last opened from. One menu serves the whole
 * tree.
 */
export function TreeMenu() {
  const {
    controller,
    menuAnchorRef,
    menuItemRef,
    menuRequest,
    onLabelChange,
    onMenuClose,
    setEditing,
  } = useTreeContext("@optiaxiom/react/TreeMenu");

  if (!menuRequest) {
    return null;
  }

  const { option } = menuRequest;
  const actions =
    resolveItemProperty(option?.actions, {
      rename: () => {
        if (option && isEditable(option, onLabelChange)) {
          setEditing(option.value);
        }
      },
    }) ?? [];

  return (
    <Menu
      defaultOpen
      /**
       * A new Menu for each request, open from the start: left uncontrolled,
       * it closes itself after an action, like any other Menu.
       */
      key={menuRequest.id}
      onOpenChange={(open) => {
        if (!open) {
          onMenuClose();
        }
      }}
      options={actions}
    >
      <MenuAnchor
        focusVisible={menuRequest.keyboard}
        virtualRef={menuAnchorRef}
      />
      <MenuContent
        aria-label={option?.label}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          // There's no trigger to take focus back, so the item does, unless
          // an action moved focus elsewhere, such as into a dialog it opened.
          // An item the action deleted hands it to the tree's tab stop.
          if (document.activeElement === document.body) {
            if (menuItemRef.current?.isConnected) {
              menuItemRef.current.focus();
            } else {
              controller.focus();
            }
          }
        }}
        // The Menu key can fire the browser's `contextmenu` on keyup, by when
        // focus is already in this menu.
        onContextMenu={(event) => event.preventDefault()}
      />
    </Menu>
  );
}

TreeMenu.displayName = "@optiaxiom/react/TreeMenu";
