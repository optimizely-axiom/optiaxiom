import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Link } from "../link";
import { Tooltip } from "../tooltip";
import * as styles from "./BreadcrumbLink.css";

export type BreadcrumbLinkProps = BoxProps<typeof Link>;

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, ...props }, ref) => {
  return (
    <Tooltip auto content={props.children}>
      <Link {...styles.link({}, className)} ref={ref} {...props} />
    </Tooltip>
  );
});
BreadcrumbLink.displayName = "@optiaxiom/react/BreadcrumbLink";
