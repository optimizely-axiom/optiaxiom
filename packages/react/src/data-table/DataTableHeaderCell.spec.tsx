import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { DataTableHeaderCell } from "./DataTableHeaderCell";

type Row = { name: string };

const columnHelper = createColumnHelper<Row>();
const columns = [columnHelper.accessor("name", { header: "Name" })];

function Harness() {
  const table = useReactTable({
    columns,
    data: [{ name: "Ada" }],
    getCoreRowModel: getCoreRowModel(),
    initialState: { sorting: [{ desc: false, id: "name" }] },
  });

  return (
    <table>
      <thead>
        <tr>
          {table.getHeaderGroups()[0].headers.map((header) => (
            <DataTableHeaderCell header={header} key={header.id}>
              {header.column.columnDef.header as string}
            </DataTableHeaderCell>
          ))}
        </tr>
      </thead>
    </table>
  );
}

describe("DataTableHeaderCell", () => {
  it("should not repeat the sort state as hidden text in the sort button", () => {
    render(<Harness />);

    expect(screen.getByRole("button").textContent).toBe("Name");
  });

  it("should hide the resize separator from the accessibility tree", () => {
    render(<Harness />);

    expect(screen.queryByRole("separator")).toBeNull();
  });
});
