import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { ButtonLoadable } from "./ButtonLoadable";

export type ButtonLabelProps = BoxProps<"div">;

export const ButtonLabel = forwardRef<HTMLDivElement, ButtonLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <ButtonLoadable asChild>
        <Flex flexDirection="row" gap="4" mx="4" ref={ref} {...props}>
          {children}
        </Flex>
      </ButtonLoadable>
    );
  },
);

ButtonLabel.displayName = "@optiaxiom/react/ButtonLabel";
