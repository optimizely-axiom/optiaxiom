import { Time, type TimeProps } from "../time";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusTime(props: Record<string, any>) {
  return <Time {...(props as TimeProps)} />;
}

ProteusTime.displayName = "@optiaxiom/react/ProteusTime";
