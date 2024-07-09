import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Textarea.css";

type TextareaProps = ExtendProps<
  ComponentPropsWithRef<"textarea">,
  ComponentPropsWithRef<typeof Box>,
  {
    bottomSection?: ReactNode;
    disabled?: boolean;
    error?: boolean;
    resize?: "none" | "vertical";
    topSection?: ReactNode;
  }
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      bottomSection,
      className,
      disabled,
      error,
      placeholder,
      readOnly,
      resize = "vertical",
      rows,
      topSection,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        aria-disabled={disabled}
        aria-invalid={error}
        data-disabled={disabled}
        data-invalid={error}
        data-resize={resize}
        {...styles.wrapper()}
        {...sprinkleProps}
      >
        {topSection && <Box>{topSection}</Box>}
        <Box
          asChild
          color={disabled ? "fg.disabled" : "fg.default"}
          {...styles.textarea({}, className)}
        >
          <textarea
            placeholder={placeholder}
            readOnly={disabled || readOnly}
            ref={ref}
            rows={rows}
            {...restProps}
          ></textarea>
        </Box>
        {bottomSection && <Box>{bottomSection}</Box>}
      </Flex>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
