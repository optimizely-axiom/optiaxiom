import * as RadixToast from "@radix-ui/react-toast";
import { createElement, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { IconCircleCheckFilled } from "../icons/IconCircleCheckFilled";
import { IconCircleExclamationFilled } from "../icons/IconCircleExclamationFilled";
import { IconCircleInfoFilled } from "../icons/IconCircleInfoFilled";
import { IconTriangleExclamationFilled } from "../icons/IconTriangleExclamationFilled";
import { IconX } from "../icons/IconX";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Toast.css";

type ToastProps = BoxProps<
  typeof RadixToast.Root,
  NonNullable<styles.RootVariants>
>;

const iconMap = {
  danger: IconCircleExclamationFilled,
  information: IconCircleInfoFilled,
  neutral: IconCircleInfoFilled,
  success: IconCircleCheckFilled,
  warning: IconTriangleExclamationFilled,
};

export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  (
    { children, colorScheme = "neutral", onOpenChange, open, ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.root({ colorScheme })} {...sprinkleProps}>
        <RadixToast.Root
          onOpenChange={onOpenChange}
          open={open}
          ref={ref}
          {...restProps}
        >
          <Box asChild {...styles.icon()}>
            {createElement(iconMap[colorScheme])}
          </Box>

          {children}

          <RadixToast.Close asChild>
            <Button
              appearance="inverse"
              aria-label="close"
              icon={<IconX />}
              size="sm"
            />
          </RadixToast.Close>
        </RadixToast.Root>
      </Box>
    );
  },
);

Toast.displayName = "@optiaxiom/react/Toast";
