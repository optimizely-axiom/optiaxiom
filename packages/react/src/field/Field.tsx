import * as RadixLabel from "@radix-ui/react-label";
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
import { Text } from "../text";
import { fallbackSpan } from "../utils";

type FieldProps = BoxProps<
  "div",
  {
    children: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
    id?: string;
    info?: ReactNode;
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
      id: idProp,
      info,
      label,
      required,
      ...props
    },
    ref,
  ) => {
    const id = useId(idProp);
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
              <RadixLabel.Root htmlFor={id} id={labelId}>
                {label}

                {required && (
                  <Text
                    aria-hidden="true"
                    asChild
                    color="fg.error"
                    fontWeight="400"
                  >
                    <span>*</span>
                  </Text>
                )}
              </RadixLabel.Root>
            </Text>

            {info && (
              <HoverCard keepOpenOnActivation>
                <HoverCardTrigger asChild>
                  <Button
                    aria-label="Information hover"
                    border="0"
                    h="12"
                    icon={<IconCircleQuestion />}
                    p="0"
                    w="12"
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
            error: !!error,
            id,
            labelId,
            required,
          }}
        >
          {children}
        </FieldContext.Provider>

        {error && (
          <Box asChild color="fg.error" fontSize="sm">
            {fallbackSpan(error)}
          </Box>
        )}

        {description && (
          <Box asChild color="fg.tertiary" fontSize="sm">
            {fallbackSpan(description)}
          </Box>
        )}
      </Flex>
    );
  },
);

Field.displayName = "@optiaxiom/react/Field";
