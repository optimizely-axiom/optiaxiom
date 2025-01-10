import { Alert, Link, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Alert>
      <Text>
        You do not have the required permissions to perform this action.
      </Text>

      <Text>
        <Link href="data:,">Request access</Link>
      </Text>
    </Alert>
  );
}
