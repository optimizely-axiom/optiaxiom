import { Portal } from "@radix-ui/react-portal";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { MenuListbox } from "../menu-listbox";
import { useSelectContext } from "../select-context";
import { Spinner } from "../spinner";
import { SelectContentImpl } from "./SelectContentImpl";

type SelectContentProps = BoxProps<
  typeof SelectContentImpl,
  {
    loading?: boolean;
    minW?: ComponentPropsWithoutRef<typeof MenuListbox>["minW"];
  }
>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, loading, ...props }, ref) => {
    const { downshift, isOpen } = useSelectContext("SelectContent");

    return (
      isOpen && (
        <Portal asChild>
          <MenuListbox asChild provider="popper">
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
          </MenuListbox>
        </Portal>
      )
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
