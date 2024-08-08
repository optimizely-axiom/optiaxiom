import * as RadixToggle from "@radix-ui/react-toggle";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconX } from "../icons/IconX";
import { Pill } from "../pill";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Chip.css";

type ChipProps = BoxProps<
  typeof RadixToggle.Root,
  {
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  } & styles.ChipVariants
>;

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      children,
      className,
      disabled,
      endDecorator,
      onPressedChange,
      size = "md",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.chip({ size }, className)} {...sprinkleProps}>
        <RadixToggle.Root asChild disabled={disabled} ref={ref} {...restProps}>
          <Pill>
            {startDecorator && (
              <Box asChild ml="4">
                {startDecorator}
              </Box>
            )}
            {children}
            {endDecorator ? (
              <Box asChild>{endDecorator}</Box>
            ) : (
              !!onPressedChange && <IconX />
            )}
          </Pill>
        </RadixToggle.Root>
      </Box>
    );
  },
);

Chip.displayName = "@optiaxiom/react/Chip";
