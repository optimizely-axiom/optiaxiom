"use client";

import { Button, dialogkit, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Button
      onClick={async () => {
        const result = await dialogkit.confirm({
          action: "Yes, delete",
          body: "The comment and all replies will be deleted.",
          header: "Delete comment?",
        });
        if (result) {
          toaster.create("Clicked confirm!");
        }
      }}
    >
      Delete comment
    </Button>
  );
}
