import type { BlockLinkProps } from "./schemas";

import { Link } from "../link";
import { BlockElement } from "./BlockElement";

export function BlockLink({ children, ...props }: BlockLinkProps) {
  return (
    <Link {...props}>{children && <BlockElement element={children} />}</Link>
  );
}

BlockLink.displayName = "@optiaxiom/react/BlockLink";
