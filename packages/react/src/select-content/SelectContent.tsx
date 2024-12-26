import { PopperContent } from "@radix-ui/react-popper";
import { Portal } from "@radix-ui/react-portal";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { MenuListbox } from "../menu-listbox";
import { ModalLayer } from "../modal-layer";
import { useSelectContext } from "../select-context";
import { Spinner } from "../spinner";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./SelectContent.css";

type SelectContentProps = BoxProps<
  typeof PopperContent,
  Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "minW"> & {
    loading?: boolean;
  }
>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      align = "start",
      children,
      className,
      loading,
      side = "bottom",
      sideOffset = 5,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift, isOpen } = useSelectContext("SelectContent");

    return (
      isOpen && (
        <Portal asChild>
          <ModalLayer asChild>
            <MenuListbox
              asChild
              minW={loading ? "trigger" : undefined}
              provider="popper"
              {...styles.content({}, className)}
              {...sprinkleProps}
              {...downshift.getMenuProps({ ref, ...restProps })}
            >
              <PopperContent align={align} side={side} sideOffset={sideOffset}>
                {loading ? (
                  <Box display="flex" justifyContent="center" p="16">
                    <Spinner />
                  </Box>
                ) : (
                  children
                )}
              </PopperContent>
            </MenuListbox>
          </ModalLayer>
        </Portal>
      )
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
