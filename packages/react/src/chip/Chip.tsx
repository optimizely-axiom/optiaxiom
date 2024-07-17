import * as RadixToggle from "@radix-ui/react-toggle";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Chip.css";
import { IconCross } from "./IconCross";

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
      colorScheme = "neutral",
      disabled,
      endDecorator,
      onPressedChange,
      size = "md",
      startDecorator: icon,
      variant = "solid",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        {...styles.chip(
          {
            colorScheme,
            size,
            variant,
          },
          className,
        )}
        {...sprinkleProps}
      >
        <Box asChild {...styles.toggleRoot()}>
          <RadixToggle.Root data-disabled={disabled} ref={ref} {...restProps}>
            {icon && (
              <Box asChild {...styles.icon({})}>
                {icon}
              </Box>
            )}
            {children}
            {endDecorator ?? (!!onPressedChange && <IconCross />)}
          </RadixToggle.Root>
        </Box>
      </Box>
    );
  },
);

Chip.displayName = "@optiaxiom/react/Chip";
