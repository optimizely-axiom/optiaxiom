import { PopperContent } from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { CommandListbox } from "../command-listbox";
import * as styles from "./AutocompleteContent.css";

type AutocompleteContentImplProps = BoxProps<typeof PopperContent>;

export const AutocompleteContentImpl = forwardRef<
  HTMLDivElement,
  AutocompleteContentImplProps
>(
  (
    { align = "center", children, className, sideOffset = 5, ...props },
    ref,
  ) => {
    return (
      <CommandListbox
        asChild
        ref={ref}
        {...styles.content({}, className)}
        {...props}
      >
        <PopperContent align={align} sideOffset={sideOffset}>
          {children}
        </PopperContent>
      </CommandListbox>
    );
  },
);

AutocompleteContentImpl.displayName =
  "@optiaxiom/react/AutocompleteContentImpl";
