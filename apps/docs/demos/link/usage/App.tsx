import { Link, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Text>
      This is <Link href="data:,">a regular link</Link> and this is{" "}
      <Link href="">a visited link</Link>
    </Text>
  );
}
