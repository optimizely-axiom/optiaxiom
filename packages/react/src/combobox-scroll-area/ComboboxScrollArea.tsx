import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
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
  return (
    <ListboxScrollArea ref={ref} {...props}>
      {loading ? (
        <Box display="flex" justifyContent="center" p="16">
          <Spinner />
        </Box>
      ) : (
        children
      )}
    </ListboxScrollArea>
  );
});

ComboboxScrollArea.displayName = "@optiaxiom/react/ComboboxScrollArea";
