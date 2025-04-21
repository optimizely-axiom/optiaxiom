import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Listbox } from "../listbox";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./ModalListbox.css";

type OverlayListboxProps = BoxProps<
  typeof Listbox,
  NonNullable<styles.ListboxVariants>
>;

export const ModalListbox = forwardRef<HTMLDivElement, OverlayListboxProps>(
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

ModalListbox.displayName = "@optiaxiom/react/ModalListbox";
