import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import {
  type ElementType,
  forwardRef,
  type MouseEvent,
  type ReactNode,
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
      addonAfter?: ReactNode;
      addonBefore?: ReactNode;
      /**
       * When this prop is set to `none` clicking empty space inside the
       * addon will focus the input box.
       */
      addonPointerEvents?: "auto" | "none";
      disabled?: boolean;
      error?: boolean;
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
      addonAfter,
      addonBefore,
      addonPointerEvents = "auto",
      children,
      className,
      error: errorProp,
      size = "md",
      ...props
    },
    outerRef,
  ) => {
    const disabled = props.disabled;
    const readOnly = props.readOnly;

    const { descriptionId, error, errorId, inputId, required } =
      useFieldContext({
        error: errorProp,
      });
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const innerRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const addonProps =
      addonPointerEvents === "none" &&
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
        {addonBefore && (
          <Text asChild {...addonProps}>
            {fallbackSpan(addonBefore)}
          </Text>
        )}

        <Box
          aria-describedby={
            errorId || descriptionId ? clsx(errorId, descriptionId) : undefined
          }
          aria-disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-required={required ? true : undefined}
          asChild
          data-disabled={disabled ? "" : undefined}
          data-invalid={error ? "" : undefined}
          data-readonly={readOnly ? "" : undefined}
          {...styles.input({ size })}
        >
          <Slot id={inputId} ref={ref} required={required} {...restProps}>
            {children}
          </Slot>
        </Box>

        {addonAfter && (
          <Text asChild {...addonProps}>
            {fallbackSpan(addonAfter)}
          </Text>
        )}
      </Flex>
    );
  },
);

InputBase.displayName = "@optiaxiom/react/InputBase";
