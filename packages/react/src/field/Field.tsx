import * as RadixLabel from "@radix-ui/react-label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useId } from "@reach/auto-id";
import { type ReactNode, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { FieldContext } from "./FieldContext";
import { IconInfo } from "./IconInfo";

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
      <Flex flexDirection="column" gap="4" maxW="sm" ref={ref} {...props}>
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
                <Tooltip content={info}>
                  <IconInfo aria-details={`info${id}`}></IconInfo>
                </Tooltip>
                <VisuallyHidden id={`info${id}`}>{info}</VisuallyHidden>
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
