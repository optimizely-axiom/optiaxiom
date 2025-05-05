import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { useSidebarContext } from "../sidebar/internals";
import * as styles from "./NavBody.css";

export type NavBodyProps = BoxProps<"div">;

export const NavBody = forwardRef<HTMLDivElement, NavBodyProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded, spacing } = useSidebarContext("@optiaxiom/react/NavBody");

    return (
      <Flex
        px={spacing}
        ref={ref}
        {...styles.body({ expanded }, className)}
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

NavBody.displayName = "@optiaxiom/react/NavBody";
