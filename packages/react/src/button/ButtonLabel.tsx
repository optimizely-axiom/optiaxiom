import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Text } from "../text";
import { ButtonLoadable } from "./ButtonLoadable";

export type ButtonLabelProps = BoxProps<"div">;

export const ButtonLabel = forwardRef<HTMLDivElement, ButtonLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <ButtonLoadable asChild>
        <Text asChild mx="4" truncate>
          <div ref={ref} {...props}>
            {children}
          </div>
        </Text>
      </ButtonLoadable>
    );
  },
);

ButtonLabel.displayName = "@optiaxiom/react/ButtonLabel";
