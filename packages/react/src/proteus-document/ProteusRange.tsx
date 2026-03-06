import { Range } from "../range";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusRange(props: Record<string, any>) {
  return <Range {...useResolvedProteusProps(props)} />;
}

ProteusRange.displayName = "@optiaxiom/react/ProteusRange";
