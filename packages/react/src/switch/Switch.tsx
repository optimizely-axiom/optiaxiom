import * as RadixLabel from "@radix-ui/react-label";
import * as RadixSwitch from "@radix-ui/react-switch";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import { type ExtendProps } from "../utils";
import * as styles from "./Switch.css";

type SwitchProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixSwitch.Root>,
  ComponentPropsWithRef<typeof Flex>,
  {
    label?: string;
    readonly?: boolean;
  } & styles.SwitchVariants
>;

export const Switch = forwardRef<
  ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(
  (
    { className, disabled, id, label, readonly, size = "default", ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Flex
        alignItems="center"
        className={className}
        flexDirection="row"
        gap="0"
        {...sprinkleProps}
      >
        <Box asChild borderColor="transparent" p="0" rounded="2xl">
          <RadixSwitch.Root
            ref={ref}
            {...restProps}
            {...styles.root({ size })}
            disabled={disabled || readonly}
            id={id}
          >
            <Box asChild bg="white" rounded="2xl" {...styles.thumb({ size })}>
              <RadixSwitch.Thumb />
            </Box>
          </RadixSwitch.Root>
        </Box>
        {label && (
          <Text asChild color={disabled ? "fg.disabled" : "fg.default"} ml="8">
            <RadixLabel.Root htmlFor={id}>{label}</RadixLabel.Root>
          </Text>
        )}
      </Flex>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
