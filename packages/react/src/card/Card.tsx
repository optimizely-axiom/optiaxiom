import { useId } from "@radix-ui/react-id";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { CardContextProvider } from "../card-context";
import { Flex } from "../flex";
import * as styles from "./Card.css";

type CardProps = BoxProps<"div">;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    const descriptionId = useId();
    const labelId = useId();

    return (
      <CardContextProvider descriptionId={descriptionId} labelId={labelId}>
        <Flex
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          ref={ref}
          {...styles.card({}, className)}
          {...props}
        >
          {children}
        </Flex>
      </CardContextProvider>
    );
  },
);

Card.displayName = "@optiaxiom/react/Card";
