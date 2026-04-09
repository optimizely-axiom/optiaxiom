import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Text } from "../text";
import { ButtonLoadable } from "./ButtonLoadable";

export type ButtonLabelProps = BoxProps<"div"> & {
  size?: "sm" | "md" | "lg";
};

const labelMarginMap = {
  sm: "4",
  md: "6",
  lg: "8",
} as const;

export const ButtonLabel = forwardRef<HTMLDivElement, ButtonLabelProps>(
  ({ children, size = "md", ...props }, ref) => {
    return (
      <ButtonLoadable asChild>
        <Text asChild mx={labelMarginMap[size]} truncate>
          <div ref={ref} {...props}>
            {children}
          </div>
        </Text>
      </ButtonLoadable>
    );
  },
);

ButtonLabel.displayName = "@optiaxiom/react/ButtonLabel";
