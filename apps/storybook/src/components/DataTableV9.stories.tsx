import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  DataTable,
  DataTableAction,
  DataTableBody,
  DataTableCheckbox,
  DataTableLabel,
  Flex,
  rowHighlightingFeature,
  Text,
} from "@optiaxiom/react";
import {
  type ColumnDef,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { expect, userEvent } from "storybook/test";

/**
 * Features only TanStack Table v9 has: v8 tables have no per-table features.
 */
const meta: Meta<typeof DataTable> = {
  component: DataTable,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Page = { id: string; title: string };

type Story = StoryObj<typeof DataTable>;

const data: Page[] = [
  { id: "home", title: "Home" },
  { id: "about", title: "About us" },
  { id: "contact", title: "Contact" },
];

const features = tableFeatures({ rowHighlightingFeature, rowSelectionFeature });

const columns: Array<ColumnDef<typeof features, Page>> = [
  {
    cell: () => <DataTableCheckbox />,
    header: () => <DataTableCheckbox />,
    id: "select",
  },
  {
    cell: ({ row }) => <DataTableLabel>{row.original.title}</DataTableLabel>,
    header: "Title",
    id: "title",
  },
  {
    cell: () => (
      <DataTableAction primary>
        <Button>Open</Button>
      </DataTableAction>
    ),
    header: "Actions",
    id: "actions",
  },
];

/**
 * The highlighted row in table state: focusing a row and the arrow keys move
 * it, and the app reads it.
 */
export const HighlightedRow: Story = {
  play: async ({ canvas }) => {
    const row = (name: string) => canvas.getByRole("row", { name });
    const status = canvas.getByRole("status");

    await userEvent.tab();
    await userEvent.tab();
    await expect(row("Home")).toHaveFocus();
    await expect(status).toHaveTextContent("home");

    await userEvent.keyboard("{ArrowDown}");
    await expect(row("About us")).toHaveFocus();
    await expect(status).toHaveTextContent("about");
  },
  render: function Render(args) {
    const [highlightedRowId, setHighlightedRowId] = useState<null | string>(
      null,
    );

    return (
      <Flex>
        <DataTable
          {...args}
          table={useTable({
            columns,
            data,
            features,
            getRowId: (page) => page.id,
            onHighlightedRowIdChange: setHighlightedRowId,
            state: { highlightedRowId },
          })}
        >
          <DataTableBody />
        </DataTable>
        <Text role="status">{highlightedRowId ?? "none"}</Text>
      </Flex>
    );
  },
};

/**
 * Setting the highlighted row moves the tab stop without moving focus.
 */
export const HighlightedRowFromOutside: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Highlight Contact" });

    await userEvent.click(button);
    await expect(button).toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("row", { name: "Contact" })).toHaveFocus();
  },
  render: function Render(args) {
    const table = useTable({
      columns,
      data,
      features,
      getRowId: (page) => page.id,
      initialState: { highlightedRowId: "about" },
    });

    return (
      <Flex>
        <Button onClick={() => table.setHighlightedRowId("contact")}>
          Highlight Contact
        </Button>
        <DataTable {...args} table={table}>
          <DataTableBody />
        </DataTable>
      </Flex>
    );
  },
};
