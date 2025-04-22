import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Link } from "../link";

type CardLinkProps = ComponentPropsWithoutRef<typeof Link>;

export const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ ...props }, ref) => {
    return <Link appearance="subtle" overlay ref={ref} {...props} />;
  },
);

CardLink.displayName = "@optiaxiom/react/CardLink";
