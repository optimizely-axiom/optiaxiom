import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconX } from "../icons/IconX";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Pill.css";

type PillProps = BoxProps<
  typeof Box,
  {
    endDecorator?: ReactNode;
    onClose?: () => void;
    readonly?: boolean;
    startDecorator?: ReactNode;
  } & styles.PillVariants
>;

export const Pill = forwardRef<HTMLDivElement, PillProps>(
  (
    {
      children,
      className,
      endDecorator,
      onClose,
      readonly,
      size = "lg",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        data-readonly={readonly}
        {...styles.pill({ size }, className)}
        {...sprinkleProps}
      >
        <Box ref={ref} {...restProps}>
          {startDecorator && (
            <Box asChild ml="4">
              {startDecorator}
            </Box>
          )}
          {children}
          {endDecorator ? (
            <Box asChild>{endDecorator}</Box>
          ) : (
            !!onClose && (
              <Box {...styles.icon()}>
                <IconX />
              </Box>
            )
          )}
        </Box>
      </Box>
    );
  },
);

Pill.displayName = "@optiaxiom/react/Pill";
