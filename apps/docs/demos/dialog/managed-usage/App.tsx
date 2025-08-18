"use client";

import { Button } from "@optiaxiom/react";
import { dialogkit } from "@optiaxiom/react/unstable";

import { CreateDialog } from "./CreateDialog";

export function App() {
  return (
    <Button onClick={() => dialogkit.create(<CreateDialog />)}>
      Open Dialog
    </Button>
  );
}
