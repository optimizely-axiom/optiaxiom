import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { IconX } from "../icons/IconX";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Pill.css";

type PillProps = BoxProps<
  "div",
  {
    endDecorator?: ReactNode;
    onClose?: () => void;
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
      size = "lg",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.pill({ size }, className)} {...sprinkleProps}>
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
              <Button
                appearance="secondary"
                icon={<IconX height="12" {...styles.icon()} />}
                size="sm"
                {...styles.button()}
              />
            )
          )}
        </Box>
      </Box>
    );
  },
);

Pill.displayName = "@optiaxiom/react/Pill";
