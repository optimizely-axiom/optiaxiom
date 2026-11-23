import type { ComponentPropsWithoutRef } from "react";

import {
  type ColumnDef,
  createSortedRowModel,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { describe, expect, it } from "vitest";

import { render, screen, within } from "../../vitest.rtl";
import { DataTable } from "./DataTable";
import { DataTableBody } from "./DataTableBody";

type Keyword = { keyword: string; volume: number };

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
});

describe("DataTable", () => {
  function setup(
    props: Omit<ComponentPropsWithoutRef<typeof DataTable>, "table">,
  ) {
    const columns: Array<ColumnDef<typeof features, Keyword>> = [
      { accessorKey: "keyword", header: "Keyword" },
      { accessorKey: "volume", header: "Volume" },
    ];
    const data: Keyword[] = [
      { keyword: "design system", volume: 300 },
      { keyword: "accessibility", volume: 900 },
    ];

    function Keywords() {
      return (
        <DataTable table={useTable({ columns, data, features })} {...props} />
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
    const { user } = setup({ children: <DataTableBody /> });

    const header = screen.getByRole("columnheader", { name: /^Keyword/ });
    expect(header).toHaveAttribute("aria-sort", "none");

    await user.click(within(header).getByRole("button"));
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(firstColumn()).toEqual(["accessibility", "design system"]);
  });
});
