import { Progress } from "@optiaxiom/react";

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

export function App({ value = "50" }: AppProps) {
  return <Progress value={parseInt(value)} w="2/3" />;
}
