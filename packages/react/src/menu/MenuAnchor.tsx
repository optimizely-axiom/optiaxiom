import { type RefObject, useEffect } from "react";

import { PopoverAnchor } from "../popover";
import { useMenuContext } from "./MenuContext";

export type MenuAnchorProps = {
  /**
   * Show the highlight ring on the active item, as when the menu was opened
   * from the keyboard.
   */
  focusVisible?: boolean;
  /**
   * What the menu opens next to: an element, or a point such as the pointer.
   */
  virtualRef: RefObject<{ getBoundingClientRect(): DOMRect }>;
};

/**
 * Positions a Menu that has no MenuTrigger, such as a context menu.
 */
export function MenuAnchor({ focusVisible, virtualRef }: MenuAnchorProps) {
  const { open, setFocusVisible, size } = useMenuContext(
    "@optiaxiom/react/MenuAnchor",
  );

  useEffect(() => {
    if (open && focusVisible) {
      setFocusVisible(true);
    }
  }, [focusVisible, open, setFocusVisible]);

  // `size` is "lg" when Menu renders as a dialog, which has nothing to anchor.
  return size === "sm" ? <PopoverAnchor virtualRef={virtualRef} /> : null;
}

MenuAnchor.displayName = "@optiaxiom/react/MenuAnchor";
