import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./AsideBody.css";

export type AsideBodyProps = ComponentPropsWithRef<typeof Box>;

export const AsideBody = forwardRef<HTMLDivElement, AsideBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.body({}, className)} {...props}>
        {children}
      </Flex>
    );
  },
);

AsideBody.displayName = "@optiaxiom/react/AsideBody";
