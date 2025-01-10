import { Alert, Button } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open && (
        <Alert onClose={() => setOpen(false)}>
          You do not have the required permissions to perform this action.
        </Alert>
      )}

      {!open && <Button onClick={() => setOpen(true)}>Show alert</Button>}
    </>
  );
}
