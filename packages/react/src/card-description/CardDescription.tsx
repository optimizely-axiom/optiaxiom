import { type ComponentPropsWithRef, forwardRef } from "react";

import { useCardContext } from "../card-context";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import * as styles from "./CardDescription.css";

type CardDescriptionProps = ComponentPropsWithRef<typeof Text>;

export const CardDescription = forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    const { descriptionId } = useCardContext("CardDescription");

    return (
      <Tooltip auto content={children}>
        <Text
          id={descriptionId}
          ref={ref}
          truncate
          {...styles.description({}, className)}
          {...props}
        >
          {children}
        </Text>
      </Tooltip>
    );
  },
);

CardDescription.displayName = "@optiaxiom/react/CardDescription";
