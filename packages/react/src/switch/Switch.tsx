import * as RadixLabel from "@radix-ui/react-label";
import * as RadixSwitch from "@radix-ui/react-switch";
import { useId } from "@reach/auto-id";
import { type ComponentPropsWithRef, forwardRef } from "react";

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

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { className, disabled, id: idProp, label, readonly, size = "md", ...props },
    ref,
  ) => {
    const id = useId(idProp);
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Flex
        alignItems="center"
        className={className}
        flexDirection="row"
        gap="0"
        {...sprinkleProps}
      >
        <Box
          asChild
          borderColor="transparent"
          id={id}
          rounded="full"
          {...styles.root({ size })}
        >
          <RadixSwitch.Root
            disabled={disabled || readonly}
            ref={ref}
            {...restProps}
          >
            <Box asChild bg="white" rounded="full" {...styles.thumb({ size })}>
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
