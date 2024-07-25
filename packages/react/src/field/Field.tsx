import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import { type ReactNode, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Button } from "../button";
import { FieldContext } from "../field-context";
import { Flex } from "../flex";
import { IconCircleQuestion } from "../icons/IconCircleQuestion";
import { Text } from "../text";
import { Tooltip } from "../tooltip";

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
              color="fg.tertiary"
              display="flex"
              fontWeight="500"
              gap="2"
            >
              <RadixLabel.Root htmlFor={id}>
                {label}

                {required && (
                  <Text
                    aria-hidden="true"
                    as="span"
                    color="fg.accent.red"
                    fontWeight="400"
                  >
                    *
                  </Text>
                )}
              </RadixLabel.Root>
            </Text>

            {info && (
              <>
                <AccessibleIcon label={info}>
                  <Tooltip content={info} keepOpenOnActivation>
                    <Button
                      border="0"
                      h="12"
                      icon={<IconCircleQuestion />}
                      p="0"
                      w="12"
                    ></Button>
                  </Tooltip>
                </AccessibleIcon>
              </>
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
