import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Textarea.css";

type TextareaProps = ExtendProps<
  ComponentPropsWithRef<"textarea">,
  ComponentPropsWithRef<typeof Box>,
  {
    disabled?: boolean;
    endDecorator?: ReactNode;
    error?: boolean;
    startDecorator?: ReactNode;
  } & styles.WrapperVariants
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      disabled,
      endDecorator,
      error,
      placeholder,
      readOnly,
      resize = "vertical",
      rows = 3,
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const Component = resize === "auto" ? TextareaAutosize : "textarea";

    return (
      <Flex
        aria-disabled={disabled}
        aria-invalid={error}
        data-disabled={disabled}
        data-invalid={error}
        {...styles.wrapper({
          resize,
        })}
        {...sprinkleProps}
      >
        {startDecorator}
        <Box
          asChild
          color={disabled ? "fg.disabled" : "fg.default"}
          {...styles.textarea({}, className)}
        >
          <Component
            maxRows={5}
            placeholder={placeholder}
            readOnly={disabled || readOnly}
            ref={ref}
            rows={rows}
            {...restProps}
          />
        </Box>
        {endDecorator}
      </Flex>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
