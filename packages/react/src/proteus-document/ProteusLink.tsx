import { Link } from "../link";
import { ProteusElement } from "./ProteusElement";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusLink({ children, ...props }: Record<string, any>) {
  return (
    <Link {...useResolvedProteusProps(props)}>
      {children && <ProteusElement element={children} />}
    </Link>
  );
}

ProteusLink.displayName = "@optiaxiom/react/ProteusLink";
