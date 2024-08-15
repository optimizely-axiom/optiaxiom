import {
  Alert,
  AlertDescription,
  AlertTitle,
  Link,
  Text,
} from "@optiaxiom/react";

export function App() {
  return (
    <Alert>
      <AlertTitle>Some action is not permitted</AlertTitle>
      <AlertDescription>
        <Text>
          You do not have the required permissions to perform this action.
        </Text>

        <Text>
          <Link href="data:,">Request access</Link>
        </Text>
      </AlertDescription>
    </Alert>
  );
}
