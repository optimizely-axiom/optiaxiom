import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useFieldContext } from "../field-context";
import { useInputContext } from "../input-context";
import * as styles from "./InputControl.css";

export type InputControlProps<
  T extends ElementType = "input" | "textarea",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    styles.ControlVariants & {
      /**
       * Whether the input is disabled.
       */
      disabled?: boolean;
      /**
       * Whether to show the input error state.
       */
      error?: boolean;
    },
    P
  >
>;

export const InputControl = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputControlProps
>(
  (
    { asChild, children, className, error: errorProp, size = "md", ...props },
    outerRef,
  ) => {
    const Comp = (asChild ? Slot : "input") as typeof Slot;

    const disabled = props.disabled;
    const readOnly = props.readOnly;

    const { descriptionId, error, errorId, inputId } = useFieldContext({
      error: errorProp,
    });
    const { boxProps, restProps } = extractBoxProps(props);

    const { inputRef } = useInputContext("InputControl");
    const ref = useComposedRefs(inputRef, outerRef);

    return (
      <Box
        aria-describedby={
          errorId || descriptionId ? clsx(errorId, descriptionId) : undefined
        }
        aria-disabled={disabled}
        aria-invalid={error ? true : undefined}
        asChild
        data-disabled={disabled ? "" : undefined}
        data-invalid={error ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
        {...styles.control({ size }, className)}
        {...boxProps}
      >
        <Comp id={inputId} ref={ref} {...restProps}>
          {children}
        </Comp>
      </Box>
    );
  },
);

InputControl.displayName = "@optiaxiom/react/InputControl";
