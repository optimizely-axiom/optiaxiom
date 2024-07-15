import * as RadixLabel from "@radix-ui/react-label";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useId } from "@reach/auto-id";
import { type ReactElement, cloneElement, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { IconInfo } from "./IconInfo";

type FieldProps = BoxProps<
  "div",
  {
    children: ReactElement;
    description?: string;
    disabled?: boolean;
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
      disabled,
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
      <Flex flexDirection="column" gap="2" maxW="sm" ref={ref} {...props}>
        {label && (
          <Flex flexDirection="row" gap="4">
            <Text
              alignItems="center"
              asChild
              display="flex"
              fontWeight="500"
              gap="2"
            >
              <RadixLabel.Root htmlFor={id}>
                {label}
                {required && (
                  <Text aria-hidden="true" as="span" color="fg.error">
                    *
                  </Text>
                )}
              </RadixLabel.Root>
            </Text>
            {info && (
              <>
                <Tooltip content={info}>
                  <IconInfo aria-details="iconInfo"></IconInfo>
                </Tooltip>
                <VisuallyHidden.Root id="iconInfo">{info}</VisuallyHidden.Root>
              </>
            )}
          </Flex>
        )}
        {cloneElement(children, {
          disabled,
          error: !!error,
          id,
          required,
        })}
        {description && (
          <Text as="p" color="fg.default" fontSize="sm">
            {description}
          </Text>
        )}
        {error && (
          <Text as="p" color="fg.error" fontSize="sm">
            {error}
          </Text>
        )}
      </Flex>
    );
  },
);

Field.displayName = "@optiaxiom/react/Field";
