import { Alert, AlertDescription, Button, Link, Text } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open && (
        <Alert
          colorScheme="danger"
          onClose={() => setOpen(false)}
          variant="solid"
          w="full"
        >
          <AlertDescription flexDirection="row">
            <Text flex="1">
              One or more of your social channel access tokens have expired.
            </Text>

            <Text>
              <Link colorScheme="neutral" href="data:,">
                Sync now
              </Link>
            </Text>
          </AlertDescription>
        </Alert>
      )}

      {!open && <Button onClick={() => setOpen(true)}>Show alert</Button>}
    </>
  );
}
