import * as RadixRadio from "@radix-ui/react-radio-group";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ControlBase } from "../control-base";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./RadioGroupItem.css";

type RadioGroupItemProps = BoxProps<
  typeof RadixRadio.Item,
  {
    endDecorator?: ReactNode;
  }
>;

export const RadioGroupItem = forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ children, endDecorator, id: idProp, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <ControlBase
        endDecorator={
          endDecorator && (
            <Box asChild ml="lg">
              {endDecorator}
            </Box>
          )
        }
        label={children}
        ref={ref}
        {...sprinkleProps}
      >
        <Box asChild {...styles.item()}>
          <RadixRadio.Item {...restProps}>
            <Box asChild {...styles.indicator()}>
              <RadixRadio.Indicator />
            </Box>
          </RadixRadio.Item>
        </Box>
      </ControlBase>
    );
  },
);

RadioGroupItem.displayName = "@optiaxiom/react/RadioGroupItem";
