import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { ModalListbox } from "../modal/internals";
import { Portal } from "../portal";
import { Spinner } from "../spinner";
import { TransitionGroup } from "../transition";
import { useDropdownMenuContext } from "./DropdownMenuContext";

export type DropdownMenuContentProps = ExcludeProps<
  BoxProps<
    typeof RadixMenu.Content,
    Pick<ComponentPropsWithoutRef<typeof ModalListbox>, "maxH" | "minW"> & {
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
  | "forceMount"
  | "hideWhenDetached"
  | "loop"
  | "sideOffset"
  | "sticky"
  | "updatePositionStrategy"
>;

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ align = "start", children, loading, ...props }, ref) => {
  const { open, presence, setPresence } = useDropdownMenuContext(
    "@optiaxiom/react/DropdownMenuContent",
  );

  return (
    <TransitionGroup
      onPresenceChange={setPresence}
      open={open}
      presence={presence}
    >
      <Portal asChild>
        <ModalListbox asChild {...props}>
          <RadixMenu.Content
            align={align}
            data-state={presence ? "open" : "closed"}
            forceMount
            onPointerMove={(event) => {
              if (!open) {
                event.preventDefault();
              }
            }}
            ref={ref}
            sideOffset={4}
          >
            {loading ? (
              <Box aria-hidden display="flex" justifyContent="center" p="16">
                <Spinner />
              </Box>
            ) : (
              children
            )}
          </RadixMenu.Content>
        </ModalListbox>
      </Portal>
    </TransitionGroup>
  );
});

DropdownMenuContent.displayName = "@optiaxiom/react/DropdownMenuContent";
