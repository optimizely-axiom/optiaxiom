import clsx from "clsx";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import {
  type ParentRecipeVariants,
  type TextAreaRecipeVariants,
  parentBoxRecipe,
  textAreaBoxRecipe,
} from "./Textarea.css";

type TextareaProps = ExtendProps<
  ComponentPropsWithRef<"textarea">,
  ComponentPropsWithRef<typeof Box>,
  {
    autoResize?: boolean;
    bottomSection?: ReactNode;
    defaultValue?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isResizeable?: boolean;
    topSection?: ReactNode;
  } & ParentRecipeVariants &
    TextAreaRecipeVariants
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      autoResize,
      bottomSection,
      className,
      defaultValue,
      isDisabled,
      isInvalid,
      isResizeable = true,
      placeholder,
      rows,
      size,
      topSection,
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        aria-invalid={isInvalid}
        border="1"
        className={clsx(parentBoxRecipe({}))}
        data-disabled={isDisabled}
        {...props}
        style={{
          resize: isResizeable ? "both" : "none",
        }}
      >
        {topSection && <Box>{topSection}</Box>}
        <Box asChild className={clsx(textAreaBoxRecipe({}), className)}>
          <textarea
            defaultValue={defaultValue}
            placeholder={placeholder}
            ref={ref}
            rows={rows}
            style={{
              resize: "none",
            }}
          ></textarea>
        </Box>
        {bottomSection && <Box>{bottomSection}</Box>}
      </Box>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
