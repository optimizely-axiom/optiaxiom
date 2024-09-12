import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { useDropdownMenuContext } from "../dropdown-menu-context";
import { Transition } from "../transition";
import * as styles from "./DropdownMenuContent.css";

type MenuContentProps = BoxProps<typeof RadixMenu.Content>;

export const DropdownMenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ align = "start", children, className, sideOffset = 2, ...props }, ref) => {
    const { open } = useDropdownMenuContext("DropdownMenuContent");

    return (
      <AnimatePresence>
        {open && (
          <RadixMenu.Portal forceMount>
            <Transition duration="sm" type="pop">
              <Box asChild {...styles.content({}, className)} {...props}>
                <RadixMenu.Content
                  align={align}
                  ref={ref}
                  sideOffset={sideOffset}
                >
                  {children}
                </RadixMenu.Content>
              </Box>
            </Transition>
          </RadixMenu.Portal>
        )}
      </AnimatePresence>
    );
  },
);

DropdownMenuContent.displayName = "@optiaxiom/react/DropdownMenuContent";
