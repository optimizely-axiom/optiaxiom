import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Listbox } from "../listbox";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./MenuListbox.css";

type MenuProps = BoxProps<typeof Listbox, NonNullable<styles.ListboxVariants>>;

export const MenuListbox = forwardRef<HTMLDivElement, MenuProps>(
  (
    { children, className, maxH, minW, provider = "popover", ...props },
    ref,
  ) => (
    <Transition duration="sm" type="pop">
      <Paper asChild>
        <Listbox
          ref={ref}
          {...styles.listbox({ maxH, minW, provider }, className)}
          {...props}
        >
          {children}
        </Listbox>
      </Paper>
    </Transition>
  ),
);

MenuListbox.displayName = "@optiaxiom/react/MenuListbox";
