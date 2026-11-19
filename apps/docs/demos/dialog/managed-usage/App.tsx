"use client";

import { Button, dialogkit } from "@optiaxiom/react";

import { CreateDialog } from "./CreateDialog";

export function App() {
  return (
    <Button onClick={() => dialogkit.create(<CreateDialog />)}>
      Open Dialog
    </Button>
  );
}
