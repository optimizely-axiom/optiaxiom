import { PopperContent } from "@radix-ui/react-popper";
import { Portal } from "@radix-ui/react-portal";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { MenuListbox } from "../menu-listbox";
import { ModalLayer } from "../modal-layer";
import { useSelectContext } from "../select-context";
import { Spinner } from "../spinner";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./SelectContent.css";

type SelectContentProps = ExcludeProps<
  BoxProps<
    typeof PopperContent,
    Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "maxH" | "minW"> & {
      /**
       * Whether to show loading spinner inside the menu.
       */
      loading?: boolean;
    }
  >,
  | "alignOffset"
  | "arrowPadding"
  | "avoidCollisions"
  | "collisionBoundary"
  | "collisionPadding"
  | "hideWhenDetached"
  | "onPlaced"
  | "sideOffset"
  | "sticky"
  | "updatePositionStrategy"
>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      align = "start",
      children,
      className,
      loading,
      side = "bottom",
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
              maxH="sm"
              minW={loading ? "trigger" : undefined}
              provider="popper"
              {...styles.content({}, className)}
              {...sprinkleProps}
              {...downshift.getMenuProps({ ref, ...restProps })}
            >
              <PopperContent align={align} side={side} sideOffset={5}>
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
