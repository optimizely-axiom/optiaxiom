import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { DisclosureContent } from "../disclosure-content";

type NavGroupContentProps = BoxProps<"div">;

export const NavGroupContent = forwardRef<HTMLDivElement, NavGroupContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <DisclosureContent m="0" p="0" ref={ref} role="list" w="full" {...props}>
        {children}
      </DisclosureContent>
    );
  },
);

NavGroupContent.displayName = "@optiaxiom/react/NavGroupContent";
