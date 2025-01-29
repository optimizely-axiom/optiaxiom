import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { DisclosureContent } from "../disclosure-content";

type NavGroupContentProps = BoxProps<"div">;

export const NavGroupContent = forwardRef<HTMLDivElement, NavGroupContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <DisclosureContent
        display="flex"
        flexDirection="column"
        gap="4"
        p="0"
        pt="4"
        ref={ref}
        role="list"
        {...props}
      >
        {children}
      </DisclosureContent>
    );
  },
);

NavGroupContent.displayName = "@optiaxiom/react/NavGroupContent";
