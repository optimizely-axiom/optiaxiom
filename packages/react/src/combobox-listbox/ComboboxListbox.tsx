import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ComboboxRadioItem } from "../combobox-radio-item";
import { useCommandContext } from "../command-context";
import { CommandListbox } from "../command-listbox";
import { Spinner } from "../spinner";

type ComboboxListboxProps = BoxProps<
  typeof CommandListbox,
  {
    /**
     * Whether to show loading spinner inside the menu.
     */
    loading?: boolean;
  }
>;

export const ComboboxListbox = forwardRef<HTMLDivElement, ComboboxListboxProps>(
  ({ children, loading, ...props }, ref) => {
    const { itemToLabel } = useCommandContext(
      "@optiaxiom/react/ComboboxListbox",
    );

    return (
      <CommandListbox ref={ref} tabIndex={-1} {...props}>
        {loading ? (
          <Box display="flex" justifyContent="center" p="16">
            <Spinner />
          </Box>
        ) : (
          (children ??
          ((item) => (
            <ComboboxRadioItem item={item}>
              {itemToLabel(item)}
            </ComboboxRadioItem>
          )))
        )}
      </CommandListbox>
    );
  },
);

ComboboxListbox.displayName = "@optiaxiom/react/ComboboxListbox";
