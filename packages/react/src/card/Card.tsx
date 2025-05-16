import { useId } from "@radix-ui/react-id";
import { forwardRef } from "react";

import { ActionsRoot } from "../actions";
import { type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./Card.css";
import { CardProvider } from "./CardContext";

export type CardProps = BoxProps<"div">;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    const descriptionId = useId();
    const labelId = useId();

    return (
      <CardProvider descriptionId={descriptionId} labelId={labelId}>
        <ActionsRoot asChild>
          <Flex ref={ref} {...styles.card({}, className)} {...props}>
            {children}
          </Flex>
        </ActionsRoot>
      </CardProvider>
    );
  },
);

Card.displayName = "@optiaxiom/react/Card";
