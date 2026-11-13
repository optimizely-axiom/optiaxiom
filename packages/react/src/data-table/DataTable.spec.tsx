import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { describe, expect, it } from "vitest";

import { render, screen, within } from "../../vitest.rtl";
import { DataTable, DataTableBody } from "./index";

type Keyword = { keyword: string; volume: number };

describe("DataTable", () => {
  function setup(overrides: Partial<TableOptions<Keyword>> = {}) {
    const columns: Array<ColumnDef<Keyword>> = [
      { accessorKey: "keyword", header: "Keyword" },
      { accessorKey: "volume", header: "Volume" },
    ];
    const data: Keyword[] = [
      { keyword: "design system", volume: 300 },
      { keyword: "accessibility", volume: 900 },
    ];

    function Keywords() {
      return (
        <DataTable
          table={useReactTable({
            columns,
            data,
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            ...overrides,
          })}
        >
          <DataTableBody />
        </DataTable>
      );
    }

    return render(<Keywords />);
  }

  function firstColumn() {
    return screen
      .getAllByRole("row")
      .slice(1)
      .map((row) => within(row).getAllByRole("cell")[0].textContent);
  }

  it("sorts from a column header", async () => {
    const { user } = setup();

    const header = screen.getByRole("columnheader", { name: /^Keyword/ });
    expect(header).toHaveAttribute("aria-sort", "none");

    await user.click(within(header).getByRole("button"));
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(firstColumn()).toEqual(["accessibility", "design system"]);
  });
});
