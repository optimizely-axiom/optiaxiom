import { SelectContent } from "../select";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusSelectContent(props: Record<string, any>) {
  return <SelectContent {...useResolvedProteusProps(props)} />;
}

ProteusSelectContent.displayName = "@optiaxiom/react/ProteusSelectContent";
