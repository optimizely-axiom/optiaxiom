import { Portal } from "@radix-ui/react-portal";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { MenuListbox } from "../menu-listbox";
import { RemoveScroll } from "../remove-scroll";
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
    const { isOpen } = useSelectContext("SelectContent");

    return (
      isOpen && (
        <Portal asChild>
          <RemoveScroll>
            <MenuListbox asChild provider="popper">
              <SelectContentImpl ref={ref} {...props}>
                {loading ? (
                  <Box display="flex" justifyContent="center" p="md">
                    <Spinner />
                  </Box>
                ) : (
                  children
                )}
              </SelectContentImpl>
            </MenuListbox>
          </RemoveScroll>
        </Portal>
      )
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
