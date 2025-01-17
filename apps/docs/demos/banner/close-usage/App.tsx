"use client";

import { Banner, Button } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open && (
        <Banner onClose={() => setOpen(false)}>
          You do not have the required permissions to perform this action.
        </Banner>
      )}

      {!open && <Button onClick={() => setOpen(true)}>Show banner</Button>}
    </>
  );
}
