import { IconTriangleExclamation } from "@optiaxiom/icons/IconTriangleExclamation";
import { useId } from "@radix-ui/react-id";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useState,
} from "react";

import { Box, type BoxProps } from "../box";
import { Group } from "../group";
import { useMessages } from "../locale";
import { SuggestionAlert } from "../suggestion";
import { fallbackSpan } from "../utils";
import { FieldProvider } from "./FieldContext";
import { FieldCount } from "./FieldCount";
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
    /**
     * Show the input's character count against its `maxLength`.
     */
    showCount?: boolean;
  }
>;

/**
 * Wrapper for inputs to provide context such as label/help/required etc.
 *
 * Size the `Field` (for example with `w`), not the input inside it. The input
 * stretches to the field's width, so the description, error and character
 * count line up with it.
 *
 * When the input sets `maxLength`, add `showCount` so users see how close they
 * are to the limit. Typing otherwise stops at the limit with no feedback.
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
      showCount,
      ...props
    },
    ref,
  ) => {
    const inputId = useId(inputIdProp);
    const descriptionId = useId();
    const errorId = useId();
    const labelId = useId(labelIdProp);
    const countId = useId();
    const messages = useMessages();
    const [countState, setCount] = useState<{
      length: number;
      maxLength: number;
    }>();
    const count = showCount ? countState : undefined;

    const descriptionNode = description && (
      <Box
        asChild
        color="fg.tertiary"
        flex={count ? "1" : undefined}
        fontSize="sm"
        id={descriptionId}
      >
        {fallbackSpan(description)}
      </Box>
    );

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
          countId={count ? countId : undefined}
          descriptionId={description ? descriptionId : undefined}
          error={!!error}
          errorId={error ? errorId : undefined}
          inputId={inputId}
          labelId={label ? labelId : undefined}
          onCountChange={showCount ? setCount : undefined}
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
        {count ? (
          <Group alignItems="start" gap="8">
            {descriptionNode}
            <FieldCount
              color="fg.tertiary"
              fontSize="sm"
              id={countId}
              length={count.length}
              maxLength={count.maxLength}
            />
          </Group>
        ) : (
          descriptionNode
        )}
        <SuggestionAlert />
      </Group>
    );
  },
);

Field.displayName = "@optiaxiom/react/Field";
