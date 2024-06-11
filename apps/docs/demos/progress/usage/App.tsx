import { Progress } from "@optiaxiom/react";

export function App({ value = "50" }: AppProps) {
  return <Progress value={parseInt(value)} />;
}

type AppProps = {
  value:
    | "0"
    | "10"
    | "20"
    | "30"
    | "40"
    | "50"
    | "60"
    | "70"
    | "80"
    | "90"
    | "100";
};
