import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { useFieldContext } from "../field-context";
import { useInputContext } from "../input-context";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./InputControl.css";

export type InputControlProps<
  T extends ElementType = "input" | "textarea",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      disabled?: boolean;
      error?: boolean;
    } & styles.ControlVariants,
    P
  >
>;

export const InputControl = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputControlProps
>(
  (
    { asChild, children, error: errorProp, size = "md", ...props },
    outerRef,
  ) => {
    const Comp = (asChild ? Slot : "input") as typeof Slot;

    const disabled = props.disabled;
    const readOnly = props.readOnly;

    const { descriptionId, error, errorId, inputId } = useFieldContext({
      error: errorProp,
    });
    const { restProps, sprinkleProps } = extractSprinkles(props);

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
        {...styles.control({ size })}
        {...sprinkleProps}
      >
        <Comp id={inputId} ref={ref} {...restProps}>
          {children}
        </Comp>
      </Box>
    );
  },
);

InputControl.displayName = "@optiaxiom/react/InputControl";
