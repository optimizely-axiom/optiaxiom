import { Range } from "../range";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusRange(props: Record<string, any>) {
  return <Range {...props} />;
}

ProteusRange.displayName = "@optiaxiom/react/ProteusRange";
