import * as RadixLabel from "@radix-ui/react-label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useId } from "@reach/auto-id";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { HoverCard } from "../hover-card";
import { HoverCardContent } from "../hover-card-content";
import { HoverCardTrigger } from "../hover-card-trigger";
import { IconCircleQuestion } from "../icons/IconCircleQuestion";
import { Text } from "../text";

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
          <HoverCard keepOpenOnActivation>
            <HoverCardTrigger asChild>
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
                p="0"
                w="2xs"
              />
            </HoverCardTrigger>
            <HoverCardContent side="top" sideOffset={5}>
              {info}
            </HoverCardContent>
          </HoverCard>
        )}
      </Flex>
    );
  },
);

FieldLabel.displayName = "@optiaxiom/react/FieldLabel";
