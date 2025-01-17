"use client";

import { Link, Text, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Text>
      This is{" "}
      <Link asChild href="data:,">
        <button onClick={() => toaster.create("Clicked!")}>
          actually a button
        </button>
      </Link>
    </Text>
  );
}
