import { PopperContent } from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ListboxBase } from "../listbox-base";
import { useSelectContext } from "../select-context";
import { Spinner } from "../spinner";
import * as styles from "./SelectContent.css";

type SelectContentProps = BoxProps<
  typeof PopperContent,
  {
    loading?: boolean;
  }
>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      align = "center",
      children,
      className,
      loading,
      side = "bottom",
      sideOffset = 5,
      ...props
    },
    ref,
  ) => {
    const { downshift, isOpen } = useSelectContext("SelectContent");

    return (
      <ListboxBase open={isOpen} provider="popper">
        <Box asChild ref={ref} {...styles.content({}, className)} {...props}>
          <PopperContent
            align={align}
            asChild
            side={side}
            sideOffset={sideOffset}
          >
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
          </PopperContent>
        </Box>
      </ListboxBase>
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
