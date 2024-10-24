import * as RadixLabel from "@radix-ui/react-label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useId } from "@reach/auto-id";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { FieldContext } from "../field-context";
import { Flex } from "../flex";
import { HoverCard } from "../hover-card";
import { HoverCardContent } from "../hover-card-content";
import { HoverCardTrigger } from "../hover-card-trigger";
import { IconCircleQuestion } from "../icons/IconCircleQuestion";
import { IconTriangleExclamation } from "../icons/IconTriangleExclamation";
import { Text } from "../text";
import { fallbackSpan } from "../utils";

type FieldProps = BoxProps<
  "div",
  {
    children: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
    info?: ReactNode;
    inputId?: string;
    label?: ReactNode;
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
          <Flex flexDirection="row" gap="4">
            <Text
              alignItems="center"
              asChild
              color="fg.secondary"
              display="flex"
              fontWeight="400"
              gap="2"
            >
              <RadixLabel.Root htmlFor={inputId} id={labelId}>
                {label}

                {required && (
                  <>
                    <Text
                      aria-hidden="true"
                      asChild
                      color="fg.error"
                      fontWeight="400"
                    >
                      <span>*</span>
                    </Text>
                    <VisuallyHidden>Required</VisuallyHidden>
                  </>
                )}
              </RadixLabel.Root>
            </Text>

            {info && (
              <HoverCard keepOpenOnActivation>
                <HoverCardTrigger asChild>
                  <Button
                    aria-label="Information hover"
                    border="0"
                    color="fg.secondary"
                    h="16"
                    icon={<IconCircleQuestion />}
                    p="0"
                    w="16"
                  />
                </HoverCardTrigger>
                <HoverCardContent side="top" sideOffset={5}>
                  {info}
                </HoverCardContent>
              </HoverCard>
            )}
          </Flex>
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

        {error && (
          <Flex
            alignItems="start"
            color="fg.error"
            flexDirection="row"
            fontSize="sm"
            gap="4"
            id={errorId}
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
