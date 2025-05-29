import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Listbox } from "../listbox";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./ModalListbox.css";

export type ModalListboxProps = BoxProps<
  typeof Listbox,
  NonNullable<styles.ListboxVariants>
>;

export const ModalListbox = forwardRef<HTMLDivElement, ModalListboxProps>(
  ({ children, className, maxH, minW, ...props }, ref) => (
    <Transition duration="sm" type="pop">
      <Paper asChild>
        <Listbox
          ref={ref}
          {...styles.listbox({ maxH, minW }, className)}
          {...props}
        >
          {children}
        </Listbox>
      </Paper>
    </Transition>
  ),
);

ModalListbox.displayName = "@optiaxiom/react/ModalListbox";
