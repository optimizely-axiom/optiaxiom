import { Badge } from "../badge";
import { ProteusElement } from "./ProteusElement";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusBadge({ children, ...props }: Record<string, any>) {
  return (
    <Badge {...props}>
      {children && <ProteusElement element={children} />}
    </Badge>
  );
}

ProteusBadge.displayName = "@optiaxiom/react/ProteusBadge";
