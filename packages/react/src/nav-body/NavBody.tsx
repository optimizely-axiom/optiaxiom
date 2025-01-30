import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./NavBody.css";

type NavBodyProps = BoxProps<"div">;

export const NavBody = forwardRef<HTMLDivElement, NavBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} role="list" {...styles.body({}, className)} {...props}>
        {children}
      </Flex>
    );
  },
);

NavBody.displayName = "@optiaxiom/react/NavBody";
