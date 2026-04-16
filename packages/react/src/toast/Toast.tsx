import { useToastProviderContext } from "@optiaxiom/globals";
import {
  IconCheckCircleSolid,
  IconCircleExclamation,
  IconCircleInfo,
  IconTriangleExclamation,
  IconXmark,
} from "@optiaxiom/icons";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixToast from "@radix-ui/react-toast";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createElement, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Button } from "../button";
import { Icon } from "../icon";
import * as styles from "./Toast.css";

export type ToastProps = ExcludeProps<
  BoxProps<typeof RadixToast.Root, styles.RootVariants>,
  "forceMount" | "open"
>;

const mapIntentToIcon = {
  danger: IconCircleExclamation,
  information: IconCircleInfo,
  neutral: IconCircleInfo,
  success: IconCheckCircleSolid,
  warning: IconTriangleExclamation,
};

/**
 * Display a brief notification.
 *
 * @since 0.1.0
 */
export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  (
    { children, className, intent = "neutral", onOpenChange, style, ...props },
    outerRef,
  ) => {
    const { boxProps, restProps } = extractBoxProps(props);
    const context = useToastProviderContext("@optiaxiom/react/Toast");

    const ref = useComposedRefs(outerRef, context.toastRef);

    return (
      <Box
        asChild
        style={{
          ...style,
          ...assignInlineVars({
            [styles.offsetVar]: `${context.offset}px`,
          }),
        }}
        {...styles.root({ intent }, className)}
        {...boxProps}
      >
        <RadixToast.Root
          forceMount={!!context}
          onOpenChange={(open) => {
            onOpenChange?.(open);
            context.onOpenChange(open);
          }}
          open={context.open}
          ref={ref}
          {...restProps}
        >
          <Icon asChild {...styles.icon()}>
            {createElement(mapIntentToIcon[intent], { filled: true })}
          </Icon>

          {children}

          <RadixToast.Close asChild>
            <Button
              appearance="inverse"
              aria-label="close"
              icon={<IconXmark />}
              size="sm"
            />
          </RadixToast.Close>
        </RadixToast.Root>
      </Box>
    );
  },
);

Toast.displayName = "@optiaxiom/react/Toast";
