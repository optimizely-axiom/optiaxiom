import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { useCardContext } from "../card-context";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { Text } from "../text";
import * as styles from "./CardTitle.css";

type CardTitleProps = BoxProps<
  "div",
  {
    caption?: string;
  }
>;

export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ caption, children, className, ...props }, ref) => {
    const { labelId } = useCardContext("CardTitle");

    return (
      <Flex id={labelId} ref={ref} {...styles.title({}, className)} {...props}>
        <Heading fontWeight="500" level="6">
          {children}
        </Heading>
        <Text color="fg.tertiary" fontSize="sm">
          {caption}
        </Text>
      </Flex>
    );
  },
);

CardTitle.displayName = "@optiaxiom/react/CardTitle";
