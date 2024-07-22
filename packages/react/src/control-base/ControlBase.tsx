import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import {
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
} from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import { fallbackSpan } from "../utils";
import * as styles from "./ControlBase.css";

type ControlBaseProps = BoxProps<
  "button",
  {
    children: ReactElement;
    endDecorator?: ReactNode;
    label?: ReactNode;
  }
>;

export const ControlBase = forwardRef<HTMLDivElement, ControlBaseProps>(
  ({ children, className, endDecorator, id: idProp, label, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const id = useId(idProp);

    return (
      <Box ref={ref} {...styles.controlBase({}, className)} {...sprinkleProps}>
        <Box asChild {...styles.indicator()}>
          {cloneElement(children, {
            id,
            ...restProps,
          })}
        </Box>

        <Text asChild {...styles.label()}>
          <RadixLabel.Root htmlFor={id}>{label}</RadixLabel.Root>
        </Text>

        {endDecorator && (
          <Box asChild {...styles.decorator()}>
            {fallbackSpan(endDecorator)}
          </Box>
        )}
      </Box>
    );
  },
);

ControlBase.displayName = "@optiaxiom/react/ControlBase";
