import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { DisclosureContent } from "../disclosure";

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
      pb="0"
      pt="0"
      transitionType="slidePop"
      {...props}
    >
      <ul ref={ref}>{children}</ul>
    </DisclosureContent>
  );
});

NavGroupContent.displayName = "@optiaxiom/react/NavGroupContent";
