import { useToastContext } from "@optiaxiom/globals";
import * as RadixToast from "@radix-ui/react-toast";
import { createElement, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Icon } from "../icon";
import { IconCircleCheckFilled } from "../icons/IconCircleCheckFilled";
import { IconCircleExclamationFilled } from "../icons/IconCircleExclamationFilled";
import { IconCircleInfoFilled } from "../icons/IconCircleInfoFilled";
import { IconTriangleExclamationFilled } from "../icons/IconTriangleExclamationFilled";
import { IconX } from "../icons/IconX";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Toast.css";

type ToastProps = BoxProps<typeof RadixToast.Root, styles.RootVariants>;

const mapIntentToIcon = {
  danger: IconCircleExclamationFilled,
  information: IconCircleInfoFilled,
  neutral: IconCircleInfoFilled,
  success: IconCircleCheckFilled,
  warning: IconTriangleExclamationFilled,
};

export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  ({ children, intent = "neutral", onOpenChange, open, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const context = useToastContext("Toast");

    return (
      <Box asChild {...styles.root({ intent })} {...sprinkleProps}>
        <RadixToast.Root
          forceMount={!!context}
          onOpenChange={(open) => {
            onOpenChange?.(open);
            context.onOpenChange(open);
          }}
          open={context.open ?? open}
          ref={ref}
          {...restProps}
        >
          <Icon asChild {...styles.icon()}>
            {createElement(mapIntentToIcon[intent])}
          </Icon>

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
