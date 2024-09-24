import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import { type ReactNode, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Button } from "../button";
import { FieldContext } from "../field-context";
import { Flex } from "../flex";
import { HoverCard } from "../hover-card";
import { HoverCardContent } from "../hover-card-content";
import { HoverCardTrigger } from "../hover-card-trigger";
import { IconCircleQuestion } from "../icons/IconCircleQuestion";
import { Text } from "../text";

type FieldProps = BoxProps<
  "div",
  {
    children: ReactNode;
    description?: string;
    error?: string;
    id?: string;
    info?: string;
    label?: string;
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
              <RadixLabel.Root htmlFor={id}>
                {label}

                {required && (
                  <Text
                    aria-hidden="true"
                    asChild
                    color="fg.accent.red"
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
                    color="dark.600"
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
            required,
          }}
        >
          {children}
        </FieldContext.Provider>

        {error && (
          <Text color="fg.accent.red" fontSize="sm">
            {error}
          </Text>
        )}

        {description && (
          <Text color="fg.tertiary" fontSize="sm">
            {description}
          </Text>
        )}
      </Flex>
    );
  },
);

Field.displayName = "@optiaxiom/react/Field";
