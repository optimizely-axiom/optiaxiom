import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import {
  type ElementType,
  type MouseEvent,
  type ReactNode,
  forwardRef,
  useRef,
} from "react";

import { Box, type BoxProps } from "../box";
import { useFieldContext } from "../field-context";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import { type ExtendProps, fallbackSpan } from "../utils";
import * as styles from "./InputBase.css";

export type InputBaseProps<
  T extends ElementType = "input" | "textarea",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      /**
       * When this prop is set to `none` clicking empty space inside the
       * decorator will focus the input box.
       */
      decoratorPointerEvents?: "auto" | "none";
      disabled?: boolean;
      endDecorator?: ReactNode;
      error?: boolean;
      startDecorator?: ReactNode;
    } & styles.InputVariants,
    P
  >
>;

export const InputBase = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputBaseProps
>(
  (
    {
      children,
      className,
      decoratorPointerEvents = "auto",
      endDecorator,
      error: errorProp,
      size = "md",
      startDecorator,
      ...props
    },
    outerRef,
  ) => {
    const disabled = props.disabled;
    const readOnly = props.readOnly;

    const { error, id, required } = useFieldContext({ error: errorProp });
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const innerRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const decoratorProps =
      decoratorPointerEvents === "none" &&
      ({
        cursor: "text",
        onMouseDown: (event: MouseEvent) => {
          if (event.target !== event.currentTarget) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          innerRef.current?.focus();
        },
      } as const);

    return (
      <Flex
        data-disabled={disabled ? "" : undefined}
        data-invalid={error ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        {startDecorator && (
          <Text asChild {...decoratorProps}>
            {fallbackSpan(startDecorator)}
          </Text>
        )}

        <Box
          aria-disabled={disabled}
          aria-invalid={error}
          asChild
          data-disabled={disabled ? "" : undefined}
          data-invalid={error ? "" : undefined}
          data-readonly={readOnly ? "" : undefined}
          {...styles.input({ size })}
        >
          <Slot id={id} ref={ref} required={required} {...restProps}>
            {children}
          </Slot>
        </Box>

        {endDecorator && (
          <Text asChild {...decoratorProps}>
            {fallbackSpan(endDecorator)}
          </Text>
        )}
      </Flex>
    );
  },
);

InputBase.displayName = "@optiaxiom/react/InputBase";
