"use client";

import { faker } from "@faker-js/faker";
import { Flex, Text } from "@optiaxiom/react";
import { DataTable } from "@optiaxiom/react/unstable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useInViewTimer } from "./useInViewTimer";

faker.seed(123);

const cols = 50;
const rows = 500;

const data = Array.from({ length: rows }, () =>
  Object.fromEntries(
    Array.from({ length: cols }, (_, index) => [
      `col${index}`,
      faker.book.title(),
    ]),
  ),
);
const columns = Array.from({ length: cols }, (_, index) => ({
  accessorKey: `col${index}`,
  header: `Column ${index + 1}`,
}));

export function App() {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination: { pageIndex: 0, pageSize: data.length } },
  });

  /**
   * A simple hook to re-render the table when it is visible on the screen.
   */
  const [count, ref] = useInViewTimer();

  return (
    <Flex ref={ref}>
      <Text>Timer: {count}s (to simulate re-rendering)</Text>
      <DataTable maxH="sm" maxW="lg" table={table} />
    </Flex>
  );
}
