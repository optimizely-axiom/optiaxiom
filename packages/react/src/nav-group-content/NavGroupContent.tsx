import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { DisclosureContent } from "../disclosure-content";

type NavGroupContentProps = BoxProps<"div">;

export const NavGroupContent = forwardRef<
  HTMLUListElement,
  NavGroupContentProps
>(({ children, ...props }, ref) => {
  return (
    <DisclosureContent
      asChild
      display="flex"
      flexDirection="column"
      gap="4"
      p="0"
      {...props}
    >
      <ul ref={ref}>{children}</ul>
    </DisclosureContent>
  );
});

NavGroupContent.displayName = "@optiaxiom/react/NavGroupContent";
