import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { CommandInput } from "../command";
import { useCommandContext } from "../command/internals";
import { useFocusBookmark } from "../focus-bookmark";
import { useMenuSubContext } from "./MenuSubContext";

export type MenuSubInputProps = ComponentPropsWithoutRef<typeof CommandInput>;

export const MenuSubInput = forwardRef<HTMLInputElement, MenuSubInputProps>(
  ({ onKeyDown, ...props }, outerRef) => {
    const { downshift, highlightedItem } = useCommandContext(
      "@optiaxiom/react/MenuSubInput",
    );
    const { setOpen } = useMenuSubContext("@optiaxiom/react/MenuSubInput");

    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useFocusBookmark(innerRef);

    return (
      <CommandInput
        m="4"
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) {
            return;
          }
          if (!(event.target instanceof HTMLInputElement)) {
            return;
          }
          if (event.target.value) {
            return;
          }

          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setOpen(false);
          } else if (
            event.key === "ArrowRight" &&
            (typeof highlightedItem?.subOptions === "function" ||
              highlightedItem?.subOptions?.length)
          ) {
            event.preventDefault();
            downshift.selectItem(highlightedItem);
          }
        }}
        ref={ref}
        {...props}
      />
    );
  },
);

MenuSubInput.displayName = "@optiaxiom/react/MenuSubInput";
