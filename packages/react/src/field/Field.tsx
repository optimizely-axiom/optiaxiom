import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import {
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils/ExtendProps";

import { Box } from "../box";
import { sprinkles } from "../sprinkles";
import { Text } from "../text";
type FormGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    children: ReactElement;
    description?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    label?: string;
    required?: boolean;
  }
>;

export const Field = forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      children,
      description,
      disabled,
      error,
      id: idProp,
      label,
      required,
      ...props
    },
    ref,
  ) => {
    const id = useId(idProp);
    return (
      <Box display="flex" flexDirection="column" maxW="sm" ref={ref} {...props}>
        {label && (
          <RadixLabel.Root
            className={sprinkles({
              color: "fg.secondary",
              fontFamily: "sans",
              fontSize: "md",
              mb: "2",
            })}
            htmlFor={id}
          >
            {label}
            {required && (
              <Text aria-hidden="true" as="span" color="border.error">
                {" "}
                *
              </Text>
            )}
          </RadixLabel.Root>
        )}
        {cloneElement(children, {
          disabled,
          error: !!error,
          id,
          required,
        })}
        {description && (
          <Text as="p" color="fg.default" fontSize="sm" mt="2">
            {description}
          </Text>
        )}
        {error && (
          <Text as="p" color="border.error" fontSize="sm" mt="2">
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

Field.displayName = "@optiaxiom/react/Field";
