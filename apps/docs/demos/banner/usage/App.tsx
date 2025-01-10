import { Banner, Link, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Banner>
      <Text>
        You do not have the required permissions to perform this action.
      </Text>

      <Text>
        <Link href="data:,">Request access</Link>
      </Text>
    </Banner>
  );
}
