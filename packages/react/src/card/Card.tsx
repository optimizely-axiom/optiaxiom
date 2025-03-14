import { useId } from "@radix-ui/react-id";
import { forwardRef } from "react";

import { ActionsRoot } from "../actions-root";
import { type BoxProps } from "../box";
import { CardProvider } from "../card-context";
import { Flex } from "../flex";
import * as styles from "./Card.css";

type CardProps = BoxProps<
  "div",
  {
    /**
     * The orientation/layout of the elements inside the card.
     */
    orientation?: "horizontal" | "vertical";
  }
>;

const mapOrientationToFlexDirection = {
  horizontal: "row",
  vertical: "column",
} as const;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, orientation = "vertical", ...props }, ref) => {
    const descriptionId = useId();
    const labelId = useId();

    return (
      <CardProvider
        descriptionId={descriptionId}
        labelId={labelId}
        orientation={orientation}
      >
        <ActionsRoot asChild>
          <Flex
            flexDirection={mapOrientationToFlexDirection[orientation]}
            ref={ref}
            {...styles.card({}, className)}
            {...props}
          >
            {children}
          </Flex>
        </ActionsRoot>
      </CardProvider>
    );
  },
);

Card.displayName = "@optiaxiom/react/Card";
