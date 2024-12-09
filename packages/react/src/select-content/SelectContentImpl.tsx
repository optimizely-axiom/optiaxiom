import { PopperContent } from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSelectContext } from "../select-context";
import { extractSprinkles } from "../sprinkles";
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
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift } = useSelectContext("SelectContentImpl");

    return (
      <Box
        asChild
        {...styles.content({}, className)}
        {...sprinkleProps}
        {...downshift.getMenuProps({ ref, ...restProps })}
      >
        <PopperContent align={align} side={side} sideOffset={sideOffset}>
          {children}
        </PopperContent>
      </Box>
    );
  },
);

SelectContentImpl.displayName = "@optiaxiom/react/SelectContentImpl";
