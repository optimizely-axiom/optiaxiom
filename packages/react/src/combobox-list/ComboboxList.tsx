import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";
import { ComboboxListContextProvider } from "../combobox-list-context";

type ComboboxListProps = BoxProps<
  "ul",
  {
    /**
     * Render each item using a children render prop.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (item: any) => ReactNode;
  }
>;

export const ComboboxList = forwardRef<HTMLUListElement, ComboboxListProps>(
  ({ children }, ref) => {
    const { downshift, items, itemToKey } = useComboboxContext("ComboboxList");
    if (!items.length) {
      return null;
    }

    return (
      <Box
        asChild
        display="flex"
        flex="1"
        flexDirection="column"
        gap="2"
        overflow="auto"
      >
        <ul {...downshift.getMenuProps({ ref })}>
          {items.map((item) => (
            <ComboboxListContextProvider
              active={downshift.selectedItem === item}
              item={item}
              key={itemToKey(item)}
            >
              {children(item)}
            </ComboboxListContextProvider>
          ))}
        </ul>
      </Box>
    );
  },
);

ComboboxList.displayName = "@optiaxiom/react/ComboboxList";
