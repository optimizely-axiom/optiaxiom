import { PopperContent } from "@radix-ui/react-popper";
import { Portal } from "@radix-ui/react-portal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { CommandListbox } from "../command-listbox";
import { MenuListbox } from "../menu-listbox";
import { ModalLayer } from "../modal-layer";
import { Spinner } from "../spinner";
import * as styles from "./AutocompleteContent.css";

type AutocompleteContentProps = ExcludeProps<
  BoxProps<
    typeof PopperContent,
    {
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
  | "sticky"
  | "updatePositionStrategy"
>;

export const AutocompleteContent = forwardRef<
  HTMLDivElement,
  AutocompleteContentProps
>(
  (
    {
      align = "center",
      children,
      className,
      loading,
      sideOffset = 5,
      ...props
    },
    ref,
  ) => {
    const { isOpen, items } = useAutocompleteContext("AutocompleteContent");

    return (
      isOpen && (
        <>
          <Portal asChild>
            <VisuallyHidden>
              <Box role="status">
                {loading
                  ? "Loading"
                  : `${items.length} option${items.length === 1 ? "" : "s"} available`}
              </Box>
            </VisuallyHidden>
          </Portal>

          <Portal asChild>
            <ModalLayer asChild>
              <MenuListbox asChild minW="trigger" provider="popper" {...props}>
                <CommandListbox
                  asChild
                  ref={ref}
                  {...styles.content({}, className)}
                  {...props}
                >
                  <PopperContent align={align} sideOffset={sideOffset}>
                    {loading ? (
                      <Box display="flex" justifyContent="center" p="16">
                        <Spinner />
                      </Box>
                    ) : (
                      children
                    )}
                  </PopperContent>
                </CommandListbox>
              </MenuListbox>
            </ModalLayer>
          </Portal>
        </>
      )
    );
  },
);

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
