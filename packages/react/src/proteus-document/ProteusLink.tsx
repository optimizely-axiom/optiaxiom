import { Link } from "../link";
import { ProteusElement } from "./ProteusElement";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusLink({ children, ...props }: Record<string, any>) {
  return (
    <Link {...props}>{children && <ProteusElement element={children} />}</Link>
  );
}

ProteusLink.displayName = "@optiaxiom/react/ProteusLink";
