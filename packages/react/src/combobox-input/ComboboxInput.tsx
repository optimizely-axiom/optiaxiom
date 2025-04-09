import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { Box } from "../box";
import { useComboboxContext } from "../combobox-context";
import { useCommandContext } from "../command-context";
import { CommandInput } from "../command-input";
import * as styles from "./ComboboxInput.css";

type ComboboxInputProps = ComponentPropsWithoutRef<typeof CommandInput>;

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  ({ className, ...props }, outerRef) => {
    const { inputRef, open, size } = useComboboxContext(
      "@optiaxiom/react/ComboboxInput",
    );
    const { downshift, highlightedItem, inputValue } = useCommandContext(
      "@optiaxiom/react/ComboboxInput",
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

            const subItems = highlightedItem.subItems;
            if (event.key === " ") {
              event.preventDefault();
              if (subItems?.length) {
                downshift.selectItem(highlightedItem);
              } else {
                highlightedItem.execute?.({ inputValue });
              }
            } else if (event.key === "ArrowRight" && subItems?.length) {
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

ComboboxInput.displayName = "@optiaxiom/react/ComboboxInput";
