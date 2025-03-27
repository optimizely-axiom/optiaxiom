import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ComboboxRadioItem } from "../combobox-radio-item";
import { useCommandContext } from "../command-context";
import { ListboxScrollArea } from "../listbox-scroll-area";
import { Spinner } from "../spinner";

type ComboboxScrollAreaProps = BoxProps<
  typeof ListboxScrollArea,
  {
    /**
     * Whether to show loading spinner inside the menu.
     */
    loading?: boolean;
  }
>;

export const ComboboxScrollArea = forwardRef<
  HTMLDivElement,
  ComboboxScrollAreaProps
>(({ children, loading, ...props }, ref) => {
  const { items } = useCommandContext("@optiaxiom/react/ComboboxScrollArea");

  return (
    <ListboxScrollArea ref={ref} {...props}>
      {loading ? (
        <Box display="flex" justifyContent="center" p="16">
          <Spinner />
        </Box>
      ) : (
        (children ??
        items.map((item) => (
          <ComboboxRadioItem item={item} key={item}>
            {item}
          </ComboboxRadioItem>
        )))
      )}
    </ListboxScrollArea>
  );
});

ComboboxScrollArea.displayName = "@optiaxiom/react/ComboboxScrollArea";
