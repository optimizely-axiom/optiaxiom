import { IconTriangleExclamation } from "@optiaxiom/icons/IconTriangleExclamation";
import { useId } from "@radix-ui/react-id";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { Box, type BoxProps } from "../box";
import { Group } from "../group";
import { useMessages } from "../locale";
import { SuggestionAlert } from "../suggestion";
import { fallbackSpan } from "../utils";
import { FieldProvider } from "./FieldContext";
import { FieldLabel } from "./FieldLabel";

export type FieldProps = BoxProps<
  "div",
  Pick<
    ComponentPropsWithoutRef<typeof FieldLabel>,
    "info" | "inputId" | "labelId" | "required"
  > & {
    /**
     * Provide description and help text for the field.
     */
    description?: ReactNode;
    /**
     * Display validation or other errors for the input.
     */
    error?: ReactNode;
    /**
     * The label of the field.
     */
    label?: ReactNode;
  }
>;

/**
 * Wrapper for inputs to provide context such as label/help/required etc.
 *
 * Size the `Field` (for example with `w`), not the input inside it. The input
 * stretches to the field's width, so the description and error line up with
 * it.
 *
 * @category form
 * @since 0.1.0
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      children,
      description,
      error,
      info,
      inputId: inputIdProp,
      label,
      labelId: labelIdProp,
      required,
      ...props
    },
    ref,
  ) => {
    const inputId = useId(inputIdProp);
    const descriptionId = useId();
    const errorId = useId();
    const labelId = useId(labelIdProp);
    const messages = useMessages();

    return (
      <Group flexDirection="column" gap="4" ref={ref} {...props}>
        {label && (
          <FieldLabel
            info={info}
            inputId={inputId}
            labelId={labelId}
            required={required}
          >
            {label}
          </FieldLabel>
        )}
        <FieldProvider
          descriptionId={description ? descriptionId : undefined}
          error={!!error}
          errorId={error ? errorId : undefined}
          inputId={inputId}
          labelId={label ? labelId : undefined}
        >
          {children}
        </FieldProvider>
        {error && error !== true && (
          <Group
            alignItems="start"
            color="fg.error"
            fontSize="sm"
            gap="4"
            id={errorId}
            role="alert"
          >
            <Box asChild flex="none" size="16">
              <IconTriangleExclamation aria-label={messages["Error"]} />
            </Box>
            {error}
          </Group>
        )}
        {description && (
          <Box asChild color="fg.tertiary" fontSize="sm" id={descriptionId}>
            {fallbackSpan(description)}
          </Box>
        )}
        <SuggestionAlert />
      </Group>
    );
  },
);

Field.displayName = "@optiaxiom/react/Field";
