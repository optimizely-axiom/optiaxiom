import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { useDropdownSubContext } from "../dropdown-sub-context";
import { Transition } from "../transition";
import * as styles from "./DropdownSubContent.css";

type SubContentProps = BoxProps<typeof RadixMenu.SubContent>;

export const DropdownSubContent = forwardRef<HTMLDivElement, SubContentProps>(
  ({ children, className, sideOffset = 2, ...props }, ref) => {
    const { open } = useDropdownSubContext("SubMenu");

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
  },
);

DropdownSubContent.displayName = "@optiaxiom/react/DropdownSubContent";
