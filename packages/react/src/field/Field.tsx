import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import { type ReactElement, cloneElement, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Box } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import { Tooltip } from "../tooltip";

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
          <Text alignItems="center" asChild display="flex" gap="2">
            <RadixLabel.Root htmlFor={id}>
              {label}
              {required && (
                <Text aria-hidden="true" as="span" color="fg.error">
                  {" "}
                  *
                </Text>
              )}
              {info && (
                <Box ml="2">
                  <Tooltip content={info} side="top">
                    <svg
                      fill="none"
                      height="12"
                      viewBox="0 0 12 12"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.99355 0.400024C2.8873 0.400024 0.393555 2.91565 0.393555 6.00002C0.393555 9.10627 2.8873 11.6 5.99355 11.6C9.07793 11.6 11.5936 9.10627 11.5936 6.00002C11.5936 2.91565 9.07793 0.400024 5.99355 0.400024ZM5.99355 10.9C3.28105 10.9 1.09355 8.71252 1.09355 6.00002C1.09355 3.3094 3.28105 1.10002 5.99355 1.10002C8.68418 1.10002 10.8936 3.3094 10.8936 6.00002C10.8936 8.71252 8.68418 10.9 5.99355 10.9ZM5.64355 7.92502C5.3373 7.92502 5.11855 8.16565 5.11855 8.45002C5.11855 8.75627 5.3373 8.97502 5.64355 8.97502C5.92793 8.97502 6.16855 8.75627 6.16855 8.45002C6.16855 8.16565 5.92793 7.92502 5.64355 7.92502ZM6.62793 3.20002H5.3373C4.52793 3.20002 3.89355 3.85627 3.89355 4.66565V4.86252C3.89355 5.0594 4.04668 5.21252 4.24355 5.21252C4.41855 5.21252 4.59355 5.0594 4.59355 4.86252V4.66565C4.59355 4.25002 4.92168 3.90002 5.3373 3.90002H6.62793C7.04355 3.90002 7.39355 4.25002 7.39355 4.66565C7.39355 4.92815 7.24043 5.19065 6.9998 5.3219L5.6873 5.97815C5.44668 6.1094 5.29355 6.3719 5.29355 6.65627V7.05002C5.29355 7.2469 5.44668 7.40002 5.64355 7.40002C5.81855 7.40002 5.99355 7.2469 5.99355 7.05002V6.65627C5.99355 6.6344 5.99355 6.61252 6.01543 6.59065L7.32793 5.9344C7.7873 5.6719 8.09355 5.19065 8.09355 4.66565C8.09355 3.85627 7.4373 3.20002 6.62793 3.20002Z"
                        fill="#080736"
                      />
                    </svg>
                  </Tooltip>
                </Box>
              )}
            </RadixLabel.Root>
          </Text>
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
