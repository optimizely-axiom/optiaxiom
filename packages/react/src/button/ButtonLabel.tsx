import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Text } from "../text";
import { ButtonLoadable } from "./ButtonLoadable";
import * as styles from "./ButtonRoot.css";

export type ButtonLabelProps = BoxProps<
  "div",
  Pick<NonNullable<styles.ButtonVariants>, "size">
>;

const mapSizeToMargin = {
  sm: "4",
  md: "6",
  lg: "6",
} as const;

export const ButtonLabel = forwardRef<HTMLDivElement, ButtonLabelProps>(
  ({ children, size = "md", ...props }, ref) => {
    return (
      <ButtonLoadable asChild>
        <Text asChild mx={mapSizeToMargin[size]} truncate>
          <div ref={ref} {...props}>
            {children}
          </div>
        </Text>
      </ButtonLoadable>
    );
  },
);

ButtonLabel.displayName = "@optiaxiom/react/ButtonLabel";
