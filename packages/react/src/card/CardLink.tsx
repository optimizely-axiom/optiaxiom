import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Link } from "../link";

export type CardLinkProps = ComponentPropsWithoutRef<typeof Link>;

export const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ ...props }, ref) => {
    return <Link appearance="subtle" cover ref={ref} {...props} />;
  },
);

CardLink.displayName = "@optiaxiom/react/CardLink";
