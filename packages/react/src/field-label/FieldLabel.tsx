import { useId } from "@radix-ui/react-id";
import * as RadixLabel from "@radix-ui/react-label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconCircleQuestion } from "../icons/IconCircleQuestion";
import { Text } from "../text";
import { Tooltip } from "../tooltip";

type FieldLabelProps = BoxProps<
  "div",
  {
    info?: ReactNode;
    inputId?: string;
    labelId?: string;
    required?: boolean;
  }
>;

export const FieldLabel = forwardRef<HTMLDivElement, FieldLabelProps>(
  (
    {
      children,
      info,
      inputId: inputIdProp,
      labelId: labelIdProp,
      required,
      ...props
    },
    ref,
  ) => {
    const inputId = useId(inputIdProp);
    const labelId = useId(labelIdProp);

    return (
      <Flex flexDirection="row" gap="4" ref={ref} {...props}>
        <Text
          alignItems="center"
          asChild
          color="fg.secondary"
          display="flex"
          fontWeight="400"
          gap="2"
        >
          <RadixLabel.Root htmlFor={inputId} id={labelId}>
            {children}

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
          <Tooltip content={info}>
            <Button
              aria-label="Information hover"
              border="0"
              color="fg.secondary"
              h="2xs"
              icon={
                <Box asChild flex="initial">
                  <IconCircleQuestion />
                </Box>
              }
              onClick={(event) => {
                event.currentTarget.focus();
                event.preventDefault();
              }}
              onPointerDownCapture={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              p="0"
              w="2xs"
            />
          </Tooltip>
        )}
      </Flex>
    );
  },
);

FieldLabel.displayName = "@optiaxiom/react/FieldLabel";
