import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { Box } from "../box";
import { useCommandContext } from "../command-context";
import { CommandInput } from "../command-input";
import { useMenuContext } from "../menu-context";
import * as styles from "./MenuInput.css";

type MenuInputProps = ComponentPropsWithoutRef<typeof CommandInput>;

export const MenuInput = forwardRef<HTMLInputElement, MenuInputProps>(
  ({ className, ...props }, outerRef) => {
    const { inputRef, open, size } = useMenuContext(
      "@optiaxiom/react/MenuInput",
    );
    const { downshift, highlightedItem } = useCommandContext(
      "@optiaxiom/react/MenuInput",
    );
    const ref = useComposedRefs(inputRef, outerRef);

    const [minWidth, setMinWidth] = useState(160);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      if (open && rect.width > minWidth) {
        setMinWidth(rect.width);
      }
    }, [downshift.inputValue, minWidth, open]);

    return (
      <Box ref={containerRef} style={{ minWidth }}>
        <CommandInput
          htmlSize={1}
          onKeyDown={(event) => {
            if (!(event.target instanceof HTMLInputElement)) {
              return;
            }
            if (event.target.value) {
              return;
            }
            if (!highlightedItem) {
              return;
            }

            const subOptions = highlightedItem.subOptions;
            if (event.key === " ") {
              event.preventDefault();
              downshift.selectItem(highlightedItem);
            } else if (event.key === "ArrowRight" && subOptions?.length) {
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
