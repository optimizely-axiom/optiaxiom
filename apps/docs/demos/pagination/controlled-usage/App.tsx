"use client";

import { Button, Group, Pagination } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [page, setPage] = useState(5);

  return (
    <Group flexDirection={["column", "row"]} gap="16">
      <Button disabled={page === 5} onClick={() => setPage(5)}>
        Reset
      </Button>
      <Pagination onPageChange={setPage} page={page} total={5} />
    </Group>
  );
}
