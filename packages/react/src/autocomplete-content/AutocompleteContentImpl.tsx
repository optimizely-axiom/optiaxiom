import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { useFocusGuards } from "@radix-ui/react-focus-guards";
import { PopperContent } from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
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
    useFocusGuards();

    return (
      <DismissableLayer asChild>
        <Box asChild ref={ref} {...styles.content({}, className)} {...props}>
          <PopperContent align={align} sideOffset={sideOffset}>
            {children}
          </PopperContent>
        </Box>
      </DismissableLayer>
    );
  },
);

AutocompleteContentImpl.displayName =
  "@optiaxiom/react/AutocompleteContentImpl";
