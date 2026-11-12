import { useToastProviderContext } from "@optiaxiom/globals";
import { IconCheckCircleSolid } from "@optiaxiom/icons/IconCheckCircleSolid";
import { IconCircleExclamation } from "@optiaxiom/icons/IconCircleExclamation";
import { IconCircleInfo } from "@optiaxiom/icons/IconCircleInfo";
import { IconTriangleExclamation } from "@optiaxiom/icons/IconTriangleExclamation";
import { IconXmark } from "@optiaxiom/icons/IconXmark";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixToast from "@radix-ui/react-toast";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createElement, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Button } from "../button";
import { Icon } from "../icon";
import { useMessages } from "../locale";
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
    const messages = useMessages();
    const context = useToastProviderContext("@optiaxiom/react/Toast");

    const ref = useComposedRefs(outerRef, context.toastRef);

    if (!(intent in mapIntentToIcon)) {
      throw new Error(
        `\`@optiaxiom/react/Toast\` has no intent "${intent}". Possible values are ${Object.keys(
          mapIntentToIcon,
        )
          .map((value) => `"${value}"`)
          .join(", ")}.`,
      );
    }

    return (
      <Box
        asChild
        style={{
          // Inline so it holds without our CSS (jsdom, stubbed CSS): Radix
          // leaves `pointer-events: none` on the viewport for the first render.
          pointerEvents: "auto",
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
              aria-label={messages["close"]}
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
