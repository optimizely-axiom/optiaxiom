import { Time, type TimeProps } from "../time";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusTime(props: Record<string, any>) {
  return <Time {...(useResolvedProteusProps(props) as TimeProps)} />;
}

ProteusTime.displayName = "@optiaxiom/react/ProteusTime";
