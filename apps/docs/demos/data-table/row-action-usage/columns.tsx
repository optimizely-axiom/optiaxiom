import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsisMenuButton,
  TableAction,
} from "@optiaxiom/react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<{
  amount: string;
  firstName: string;
  id: number;
  lastName: string;
}>();

export const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
  }),
  columnHelper.accessor("amount", {
    cell: ({ renderValue }) => `$${renderValue()}`,
    header: "Amount",
    size: 100,
  }),
  columnHelper.display({
    cell: ({ row }) => (
      <TableAction>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisMenuButton
              appearance="subtle"
              aria-label="More options"
              size="sm"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() =>
                navigator.clipboard.writeText(row.original.id.toString())
              }
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem intent="danger">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableAction>
    ),
    id: "actions",
    size: 56,
  }),
];
