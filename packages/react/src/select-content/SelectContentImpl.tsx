import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { useFocusGuards } from "@radix-ui/react-focus-guards";
import { PopperContent } from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./SelectContent.css";

type SelectContentImplProps = BoxProps<typeof PopperContent>;

export const SelectContentImpl = forwardRef<
  HTMLDivElement,
  SelectContentImplProps
>(
  (
    {
      align = "start",
      children,
      className,
      side = "bottom",
      sideOffset = 5,
      ...props
    },
    ref,
  ) => {
    useFocusGuards();

    return (
      <DismissableLayer asChild>
        <Box asChild ref={ref} {...styles.content({}, className)} {...props}>
          <PopperContent
            align={align}
            asChild
            side={side}
            sideOffset={sideOffset}
          >
            {children}
          </PopperContent>
        </Box>
      </DismissableLayer>
    );
  },
);

SelectContentImpl.displayName = "@optiaxiom/react/SelectContentImpl";
