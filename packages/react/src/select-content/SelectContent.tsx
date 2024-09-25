import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type SelectContentProps = BoxProps<typeof RadixSelect.Content>;

import { IconAngleDown } from "../icons/IconAngleDown";
import * as styles from "./SelectContent.css";

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      align = "start",
      children,
      className,
      position = "popper",
      sideOffset = 2,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixSelect.Portal>
        <Box asChild ref={ref} {...styles.content({}, className)} {...props}>
          <RadixSelect.Content
            align={align}
            position={position}
            ref={ref}
            sideOffset={sideOffset}
          >
            <Box
              alignItems="center"
              asChild
              display="flex"
              justifyContent="center"
            >
              <RadixSelect.ScrollUpButton>
                <IconAngleDown style={{ transform: "rotate(180deg)" }} />
              </RadixSelect.ScrollUpButton>
            </Box>

            <RadixSelect.Viewport>{children}</RadixSelect.Viewport>

            <Box
              alignItems="center"
              asChild
              display="flex"
              justifyContent="center"
            >
              <RadixSelect.ScrollDownButton>
                <IconAngleDown />
              </RadixSelect.ScrollDownButton>
            </Box>
          </RadixSelect.Content>
        </Box>
      </RadixSelect.Portal>
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
