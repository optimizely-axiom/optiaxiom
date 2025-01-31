import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { useSidebarContext } from "../sidebar-context";
import * as styles from "./NavBody.css";

type NavBodyProps = BoxProps<"div">;

export const NavBody = forwardRef<HTMLDivElement, NavBodyProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded } = useSidebarContext("NavBody");

    return (
      <Flex ref={ref} {...styles.body({ expanded }, className)} {...props}>
        {children}
      </Flex>
    );
  },
);

NavBody.displayName = "@optiaxiom/react/NavBody";
