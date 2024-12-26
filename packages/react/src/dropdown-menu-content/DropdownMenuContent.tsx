import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { useDropdownMenuContext } from "../dropdown-menu-context";
import { MenuListbox } from "../menu-listbox";
import { Spinner } from "../spinner";

type DropdownMenuContentProps = ExcludeProps<
  BoxProps<
    typeof RadixMenu.Content,
    Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "minW"> & {
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
  | "sticky"
  | "updatePositionStrategy"
>;

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ align = "start", children, loading, sideOffset = 4, ...props }, ref) => {
  const { open } = useDropdownMenuContext("DropdownMenuContent");

  return (
    <AnimatePresence>
      {open && (
        <RadixMenu.Portal forceMount>
          <MenuListbox
            asChild
            minW={loading ? "trigger" : undefined}
            provider="dropdown-menu"
            {...props}
          >
            <RadixMenu.Content align={align} ref={ref} sideOffset={sideOffset}>
              {loading ? (
                <Box display="flex" justifyContent="center" p="16">
                  <Spinner />
                </Box>
              ) : (
                children
              )}
            </RadixMenu.Content>
          </MenuListbox>
        </RadixMenu.Portal>
      )}
    </AnimatePresence>
  );
});

DropdownMenuContent.displayName = "@optiaxiom/react/DropdownMenuContent";
