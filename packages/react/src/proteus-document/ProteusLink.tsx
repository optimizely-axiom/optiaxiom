import type { ProteusLinkProps } from "./schemas";

import { Link } from "../link";
import { ProteusElement } from "./ProteusElement";

export function ProteusLink({ children, ...props }: ProteusLinkProps) {
  return (
    <Link {...props}>{children && <ProteusElement element={children} />}</Link>
  );
}

ProteusLink.displayName = "@optiaxiom/react/ProteusLink";
