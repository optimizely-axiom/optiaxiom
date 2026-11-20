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
  rowIntentFeature,
  Text,
} from "@optiaxiom/react";
import {
  type ColumnDef,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { expect, userEvent, waitFor, type within } from "storybook/test";

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

const pages = (count: number): Page[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `page-${index + 1}`,
    title: `Page ${index + 1}`,
  }));

/**
 * Waits for the named row to be fully visible below the table's pinned header.
 */
const expectRowInView = (canvas: ReturnType<typeof within>, name: string) =>
  waitFor(async () => {
    const scroller = canvas.getByRole("table").parentElement!;
    const row = canvas.getByRole("row", { name }).getBoundingClientRect();
    const header = canvas.getAllByRole("rowgroup")[0].getBoundingClientRect();
    const view = scroller.getBoundingClientRect();
    await expect(row.top).toBeGreaterThanOrEqual(header.bottom);
    await expect(row.bottom).toBeLessThanOrEqual(
      view.top + scroller.clientTop + scroller.clientHeight,
    );
  });

/**
 * Setting the highlighted row moves the tab stop without moving focus, and
 * scrolls the row into view when it isn't already.
 */
export const HighlightedRowFromOutside: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Highlight Page 15" });

    await userEvent.click(button);
    await expect(button).toHaveFocus();
    await expectRowInView(canvas, "Page 15");

    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("row", { name: "Page 15" })).toHaveFocus();
  },
  render: function Render(args) {
    const table = useTable({
      columns: columns.filter(({ id }) => id !== "select"),
      data: pages(15),
      features,
      getRowId: (page) => page.id,
      initialState: { highlightedRowId: "page-1" },
    });

    return (
      <Flex>
        <Button onClick={() => table.setHighlightedRowId("page-15")}>
          Highlight Page 15
        </Button>
        <DataTable {...args} style={{ maxHeight: "300px" }} table={table}>
          <DataTableBody />
        </DataTable>
      </Flex>
    );
  },
};

/**
 * The same in a long table, which virtualizes rows out of the DOM, so an app
 * returning to a list can reveal the row it left from.
 */
export const HighlightedRowFromOutsideVirtualized: Story = {
  play: async ({ canvas }) => {
    await expectRowInView(canvas, "Page 80");

    const top = () =>
      canvas.getByRole("row", { name: "Page 79" }).getBoundingClientRect().top;
    const before = top();
    await userEvent.click(
      canvas.getByRole("button", { name: "Highlight Page 79" }),
    );
    // The virtualizer settles sub-pixel row sizes, so allow a pixel.
    await expect(Math.abs(top() - before)).toBeLessThanOrEqual(1);

    await userEvent.click(
      canvas.getByRole("button", { name: "Highlight Page 5" }),
    );
    await expectRowInView(canvas, "Page 5");
  },
  render: function Render(args) {
    const table = useTable({
      columns: columns.filter(({ id }) => id !== "select"),
      data: pages(100),
      features,
      getRowId: (page) => page.id,
      initialState: { highlightedRowId: "page-80" },
    });

    return (
      <Flex>
        <Flex flexDirection="row">
          <Button onClick={() => table.setHighlightedRowId("page-79")}>
            Highlight Page 79
          </Button>
          <Button onClick={() => table.setHighlightedRowId("page-5")}>
            Highlight Page 5
          </Button>
        </Flex>
        <DataTable {...args} style={{ maxHeight: "300px" }} table={table}>
          <DataTableBody />
        </DataTable>
      </Flex>
    );
  },
};

const intentData: Page[] = [
  { id: "home", title: "Home" },
  { id: "about", title: "About us" },
  { id: "news", title: "News" },
  { id: "contact", title: "Contact" },
];

const intentFeatures = tableFeatures({ rowIntentFeature, rowSelectionFeature });

/**
 * The `primary` intent gives a row the selected color without selecting it,
 * here for the row a details pane would show (About us). It looks the same on
 * a selected row (News) and doesn't change on hover.
 */
export const RowIntent: Story = {
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useTable({
          columns: columns as Array<ColumnDef<typeof intentFeatures, Page>>,
          data: intentData,
          features: intentFeatures,
          getRowId: (page) => page.id,
          getRowIntent: (row) =>
            row.id === "about" || row.id === "news" ? "primary" : undefined,
          initialState: { rowSelection: { contact: true, news: true } },
        })}
      >
        <DataTableBody />
      </DataTable>
    );
  },
};
