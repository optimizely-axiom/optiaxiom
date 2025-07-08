import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { Box } from "../box";
import { CommandInput } from "../command";
import { useCommandContext } from "../command/internals";
import { useMenuContext } from "./MenuContext";
import * as styles from "./MenuInput.css";

export type MenuInputProps = ComponentPropsWithoutRef<typeof CommandInput>;

export const MenuInput = forwardRef<HTMLInputElement, MenuInputProps>(
  ({ className, onKeyDown, ...props }, outerRef) => {
    const { inputRef, open, setActiveItemStack, size } = useMenuContext(
      "@optiaxiom/react/MenuInput",
    );
    const { downshift, highlightedItem } = useCommandContext(
      "@optiaxiom/react/MenuInput",
    );
    const ref = useComposedRefs(inputRef, outerRef);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      if (open) {
        containerRef.current.style.minWidth = `${rect.width}px`;
      }
    }, [downshift.inputValue, open]);

    return (
      <Box ref={containerRef} style={{ minWidth: 160 }}>
        <CommandInput
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

            if (event.key === "Backspace" && size === "lg") {
              event.preventDefault();
              setActiveItemStack((stack) =>
                stack.length ? stack.slice(0, -1) : stack,
              );
            } else if (
              event.key === "ArrowRight" &&
              (typeof highlightedItem?.subOptions === "function" ||
                highlightedItem?.subOptions?.length) &&
              size === "sm"
            ) {
              event.preventDefault();
              downshift.selectItem(highlightedItem);
            }
          }}
          ref={ref}
          size={size === "sm" ? "md" : "xl"}
          {...styles.input({ size }, className)}
          {...props}
        />
      </Box>
    );
  },
);

MenuInput.displayName = "@optiaxiom/react/MenuInput";
