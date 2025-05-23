import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { DisclosureContent } from "../disclosure";

export type NavGroupContentProps = BoxProps<"div">;

export const NavGroupContent = forwardRef<
  HTMLUListElement,
  NavGroupContentProps
>(({ children, ...props }, ref) => {
  return (
    <DisclosureContent
      asChild
      data-transition-scale
      display="flex"
      flexDirection="column"
      gap="4"
      pb="0"
      pt="0"
      {...props}
    >
      <ul ref={ref}>{children}</ul>
    </DisclosureContent>
  );
});

NavGroupContent.displayName = "@optiaxiom/react/NavGroupContent";
