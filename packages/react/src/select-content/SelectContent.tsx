import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ListboxBase } from "../listbox-base";
import { useSelectContext } from "../select-context";
import { Spinner } from "../spinner";
import { SelectContentImpl } from "./SelectContentImpl";

type SelectContentProps = BoxProps<
  typeof SelectContentImpl,
  {
    loading?: boolean;
  }
>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, loading, ...props }, ref) => {
    const { downshift, isOpen } = useSelectContext("SelectContent");

    return (
      <ListboxBase open={isOpen} provider="popper">
        <SelectContentImpl ref={ref} {...props}>
          <ul {...downshift.getMenuProps({}, { suppressRefError: true })}>
            {loading ? (
              <Box asChild display="flex" justifyContent="center" p="md">
                <li>
                  <Spinner />
                </li>
              </Box>
            ) : (
              children
            )}
          </ul>
        </SelectContentImpl>
      </ListboxBase>
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
