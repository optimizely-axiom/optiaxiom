import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import {
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
} from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import * as styles from "./ControlBase.css";

type ControlBaseProps = BoxProps<
  "button",
  {
    children: ReactElement;
    endDecorator?: ReactNode;
    label?: ReactNode;
    readonly?: boolean;
  }
>;

export const ControlBase = forwardRef<HTMLDivElement, ControlBaseProps>(
  (
    {
      children,
      className,
      disabled,
      endDecorator,
      id: idProp,
      label,
      readonly,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const id = useId(idProp);

    return (
      <Flex className={className} gap="0" ref={ref} {...sprinkleProps}>
        <Flex {...styles.controlBase({ readonly })}>
          <Box asChild {...styles.indicator()}>
            {cloneElement(children, {
              disabled: Boolean(disabled || readonly),
              id,
              ...restProps,
            })}
          </Box>

          <Text asChild {...styles.label()}>
            <RadixLabel.Root htmlFor={id}>{label}</RadixLabel.Root>
          </Text>
        </Flex>

        {endDecorator}
      </Flex>
    );
  },
);

ControlBase.displayName = "@optiaxiom/react/ControlBase";
