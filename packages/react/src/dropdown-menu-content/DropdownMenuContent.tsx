import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { useDropdownMenuContext } from "../dropdown-menu-context";
import { OverlayListbox } from "../overlay-listbox";
import { Spinner } from "../spinner";
import { TransitionGroup } from "../transition-group";

type DropdownMenuContentProps = ExcludeProps<
  BoxProps<
    typeof RadixMenu.Content,
    Pick<ComponentPropsWithoutRef<typeof OverlayListbox>, "maxH" | "minW"> & {
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
      <RadixMenu.Portal forceMount>
        <OverlayListbox
          asChild
          minW={loading ? "trigger" : undefined}
          provider="dropdown-menu"
          {...props}
        >
          <RadixMenu.Content
            align={align}
            onPointerMove={(event) => {
              if (!open) {
                event.preventDefault();
              }
            }}
            ref={ref}
            sideOffset={4}
          >
            {loading ? (
              <Box display="flex" justifyContent="center" p="16">
                <Spinner />
              </Box>
            ) : (
              children
            )}
          </RadixMenu.Content>
        </OverlayListbox>
      </RadixMenu.Portal>
    </TransitionGroup>
  );
});

DropdownMenuContent.displayName = "@optiaxiom/react/DropdownMenuContent";
