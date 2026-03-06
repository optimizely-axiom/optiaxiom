import { Separator } from "../separator";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusSeparator(props: Record<string, any>) {
  return <Separator {...useResolvedProteusProps(props)} />;
}

ProteusSeparator.displayName = "@optiaxiom/react/ProteusSeparator";
