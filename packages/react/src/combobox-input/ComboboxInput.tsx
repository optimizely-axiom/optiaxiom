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

type ComboboxInputProps = ComponentPropsWithoutRef<typeof CommandInput>;

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  (props, ref) => {
    const { downshift, highlightedItem } = useCommandContext("ComboboxInput");
    const { open } = useComboboxContext("ComboboxInput");

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
          m="4"
          onKeyDown={(event) => {
            if (event.key === " " && highlightedItem) {
              event.preventDefault();
              downshift.selectItem(highlightedItem);
            }
          }}
          ref={ref}
          {...props}
        />
      </Box>
    );
  },
);

ComboboxInput.displayName = "@optiaxiom/react/ComboboxInput";
