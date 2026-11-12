"use client";

import { IconPlus } from "@optiaxiom/icons";
import {
  Button,
  DataTable,
  DataTableBody,
  DataTableFooter,
  Flex,
  Group,
  LabelMenuButton,
  Menu,
  MenuContent,
  MenuTrigger,
  SearchInput,
  toaster,
} from "@optiaxiom/react";
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";

import { columns } from "./columns";
import { data } from "./data";

const filters = [
  { id: "status", label: "Status", values: ["Draft", "Ready"] },
  {
    id: "owner",
    label: "Owner",
    values: [...new Set(data.map((item) => item.owner))].sort(),
  },
];

export function App() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    columns,
    data,
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: { columnFilters, globalFilter },
  });

  return (
    <Flex maxW="full" w="full">
      <Group flexWrap="wrap" gap="12" justifyContent="space-between">
        <Group flexWrap="wrap" gap="8">
          <SearchInput
            aria-label="Search items"
            onValueChange={setGlobalFilter}
            placeholder="Search items"
            ref={searchRef}
            size="lg"
            value={globalFilter}
          />
          {filters.map((filter) => {
            const column = table.getColumn(filter.id);
            const value = column?.getFilterValue() as string | undefined;
            return (
              <Menu
                key={filter.id}
                options={[undefined, ...filter.values].map((option) => ({
                  execute: () => column?.setFilterValue(option),
                  label: option ?? "All",
                  selected: value === option,
                }))}
              >
                <MenuTrigger asChild>
                  <LabelMenuButton label={filter.label}>
                    {value ?? "All"}
                  </LabelMenuButton>
                </MenuTrigger>
                <MenuContent />
              </Menu>
            );
          })}
        </Group>
        <Button
          appearance="primary"
          icon={<IconPlus />}
          onClick={() => toaster.create("Create item")}
          size="lg"
        >
          Create item
        </Button>
      </Group>

      <DataTable table={table}>
        <DataTableBody
          empty={
            <>
              No items match your filters.
              <Button
                appearance="subtle"
                mt="8"
                onClick={() => {
                  setGlobalFilter("");
                  setColumnFilters([]);
                  searchRef.current?.focus();
                }}
              >
                Clear filters
              </Button>
            </>
          }
        />
        <DataTableFooter />
      </DataTable>
    </Flex>
  );
}
