import { Alert, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Alert intent="neutral">This is an example of a neutral alert.</Alert>
      <Alert intent="information">
        This is an example of an information alert.
      </Alert>
      <Alert intent="success">This is an example of a success alert.</Alert>
      <Alert intent="warning">This is an example of a warning alert.</Alert>
      <Alert intent="danger">This is an example of a danger alert.</Alert>
      <Alert intent="opal">This is an example of an opal alert.</Alert>
    </Group>
  );
}
