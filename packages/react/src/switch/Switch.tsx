import * as RadixLabel from "@radix-ui/react-label";
import * as RadixSwitch from "@radix-ui/react-switch";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";

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
        {...sprinkleProps}
      >
        <RadixSwitch.Root
          ref={ref}
          {...restProps}
          className={styles.root({ size })}
          disabled={disabled || readonly}
          id={id}
        >
          <RadixSwitch.Thumb className={styles.thumb({ size })} />
        </RadixSwitch.Root>
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
