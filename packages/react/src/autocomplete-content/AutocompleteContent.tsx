import { PopperContent } from "@radix-ui/react-popper";
import { Portal } from "@radix-ui/react-portal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { CommandListbox } from "../command-listbox";
import { MenuListbox } from "../menu-listbox";
import { ModalLayer } from "../modal-layer";
import { Spinner } from "../spinner";
import * as styles from "./AutocompleteContent.css";

type AutocompleteContentProps = ExcludeProps<
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
      side = "bottom",
      ...props
    },
    ref,
  ) => {
    const { isOpen, items } = useAutocompleteContext("AutocompleteContent");
    const { setPlaced } = useCommandContext("AutocompleteContent");

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
              <MenuListbox
                asChild
                maxH="sm"
                minW="trigger"
                provider="popper"
                {...props}
              >
                <CommandListbox
                  asChild
                  ref={ref}
                  {...styles.content({}, className)}
                  {...props}
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
