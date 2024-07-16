import * as RadixToggle from "@radix-ui/react-toggle";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Chip.css";
import { IconCross } from "./IconCross";

type ChipProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixToggle.Root>,
  ComponentPropsWithRef<typeof Box>,
  {
    children?: ReactNode;
    disabled?: boolean;
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
        {...props}
      >
        <RadixToggle.Root data-disabled={disabled} ref={ref}>
          {icon && (
            <Box asChild {...styles.icon({})}>
              {icon}
            </Box>
          )}
          {children}
          {endDecorator ?? (!!onPressedChange && <IconCross />)}
        </RadixToggle.Root>
      </Box>
    );
  },
);

Chip.displayName = "@optiaxiom/react/Chip";
