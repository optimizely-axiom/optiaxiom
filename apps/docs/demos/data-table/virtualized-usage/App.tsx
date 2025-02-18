"use client";

import { faker } from "@faker-js/faker";
import { Flex, Text } from "@optiaxiom/react";
import { DataTable } from "@optiaxiom/react/unstable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";

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

  const [count, setCount] = useState(0);
  const timerRef = useRef(0);
  useEffect(() => {
    timerRef.current = window.setInterval(
      () => setCount((count) => count + 1),
      1000,
    );
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <Flex>
      <Text>Timer: {count}s (to simulate re-rendering)</Text>
      <DataTable maxH="sm" maxW="lg" table={table} />
    </Flex>
  );
}
