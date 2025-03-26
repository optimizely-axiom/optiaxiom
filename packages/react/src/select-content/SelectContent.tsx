import { PopperContent } from "@radix-ui/react-popper";
import { Portal } from "@radix-ui/react-portal";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { MenuListbox } from "../menu-listbox";
import { ModalLayer } from "../modal-layer";
import { useSelectContext } from "../select-context";
import { SelectRadioItem } from "../select-radio-item";
import { Spinner } from "../spinner";
import { TransitionGroup } from "../transition-group";
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
    const { boxProps, restProps } = extractBoxProps(props);
    const {
      downshift,
      isOpen,
      items,
      itemToLabel,
      itemToValue,
      placed,
      setPlaced,
    } = useSelectContext("@optiaxiom/react/SelectContent");

    return (
      <TransitionGroup
        onPresenceChange={(presence) => {
          if (!presence) {
            setPlaced(presence);
          }
        }}
        open={isOpen}
        presence={placed}
      >
        <Portal asChild>
          <ModalLayer asChild>
            <MenuListbox
              asChild
              maxH="sm"
              minW={loading ? "trigger" : undefined}
              provider="popper"
              {...styles.content({}, className)}
              {...boxProps}
              {...downshift.getMenuProps(
                { ref, ...restProps },
                { suppressRefError: !placed },
              )}
            >
              <PopperContent
                align={align}
                onPlaced={() => setPlaced(true)}
                side={side}
                sideOffset={5}
              >
                {loading ? (
                  <Box display="flex" justifyContent="center" p="16">
                    <Spinner />
                  </Box>
                ) : (
                  (children ??
                  items.map((item) => {
                    return (
                      <SelectRadioItem item={item} key={itemToValue(item)}>
                        {itemToLabel(item)}
                      </SelectRadioItem>
                    );
                  }))
                )}
              </PopperContent>
            </MenuListbox>
          </ModalLayer>
        </Portal>
      </TransitionGroup>
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
