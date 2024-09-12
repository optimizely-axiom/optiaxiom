import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";
import { Transition } from "../transition";
import * as styles from "./DropdownMenuSubContent.css";

type MenuSubContentProps = BoxProps<typeof RadixMenu.SubContent>;

export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  MenuSubContentProps
>(({ children, className, sideOffset = 2, ...props }, ref) => {
  const { open } = useDropdownMenuSubContext("DropdownMenuSubContent");

  return (
    <AnimatePresence>
      {open && (
        <RadixMenu.Portal forceMount>
          <Transition duration="sm" type="pop">
            <Box asChild {...styles.content({}, className)} {...props}>
              <RadixMenu.SubContent ref={ref} sideOffset={sideOffset}>
                {children}
              </RadixMenu.SubContent>
            </Box>
          </Transition>
        </RadixMenu.Portal>
      )}
    </AnimatePresence>
  );
});

DropdownMenuSubContent.displayName = "@optiaxiom/react/DropdownMenuSubContent";
