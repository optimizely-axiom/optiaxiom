import { useId } from "@reach/auto-id";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { FieldContext } from "../field-context";
import { FieldLabel } from "../field-label";
import { Flex } from "../flex";
import { IconTriangleExclamation } from "../icons/IconTriangleExclamation";
import { fallbackSpan } from "../utils";

type FieldProps = BoxProps<
  "div",
  {
    /**
     * Provide description and help text for the field.
     */
    description?: ReactNode;
    /**
     * Display validation or other errors for the input.
     */
    error?: ReactNode;
    /**
     * Display a help icon with additional context for the input.
     */
    info?: ReactNode;
    /**
     * Override the default generated input ID used for associating the label to the input.
     */
    inputId?: string;
    /**
     * The label of the field.
     */
    label?: ReactNode;
    /**
     * Display an asterisk for required inputs.
     */
    required?: boolean;
  }
>;

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      children,
      description,
      error,
      info,
      inputId: inputIdProp,
      label,
      required,
      ...props
    },
    ref,
  ) => {
    const inputId = useId(inputIdProp);
    const descriptionId = useId();
    const errorId = useId();
    const labelId = useId();

    return (
      <Flex flexDirection="column" gap="4" ref={ref} {...props}>
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

        <FieldContext.Provider
          value={{
            descriptionId: description ? descriptionId : undefined,
            error: !!error,
            errorId: error ? errorId : undefined,
            inputId,
            labelId: label ? labelId : undefined,
          }}
        >
          {children}
        </FieldContext.Provider>

        {error && error !== true && (
          <Flex
            alignItems="start"
            color="fg.error"
            flexDirection="row"
            fontSize="sm"
            gap="4"
            id={errorId}
            role="alert"
          >
            <Box asChild flex="none" mt="2">
              <IconTriangleExclamation
                aria-label="Error"
                height={12}
                width={14}
              />
            </Box>
            {error}
          </Flex>
        )}

        {description && (
          <Box asChild color="fg.tertiary" fontSize="sm" id={descriptionId}>
            {fallbackSpan(description)}
          </Box>
        )}
      </Flex>
    );
  },
);

Field.displayName = "@optiaxiom/react/Field";
