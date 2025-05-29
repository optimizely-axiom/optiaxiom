import {
  Box,
  Button,
  DataTableAction,
  DataTableLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsisMenuButton,
  Flex,
  Link,
  Text,
  toaster,
} from "@optiaxiom/react";
import { IconShare3 } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<{
  id: number;
  modified_at: Date;
  modified_by: string;
  name: string;
}>();

export const columns = [
  columnHelper.display({
    cell: ({ row }) => (
      <Flex flexDirection="row" justifyContent="space-between" w="full">
        <DataTableLabel asChild>
          <DataTableAction asChild flex="initial" overflow="hidden" primary>
            <Link
              appearance="subtle"
              href="data:,"
              onClick={(event) => {
                event.preventDefault();
                toaster.create(`Clicked: ${row.original.name}`);
              }}
            >
              <Text truncate>{row.original.name}</Text>
            </Link>
          </DataTableAction>
        </DataTableLabel>

        <Flex flex="none" flexDirection="row" gap="8">
          <DropdownMenu>
            <DataTableAction asChild>
              <DropdownMenuTrigger asChild>
                <EllipsisMenuButton
                  appearance="subtle"
                  aria-label="More options"
                  size="sm"
                />
              </DropdownMenuTrigger>
            </DataTableAction>
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

          <DataTableAction asChild>
            <Button
              appearance="subtle"
              aria-label="Share"
              icon={<IconShare3 />}
              size="sm"
            />
          </DataTableAction>
        </Flex>
      </Flex>
    ),
    header: "Name",
    id: "name",
    size: 350,
  }),
  columnHelper.accessor("modified_at", {
    cell: ({ renderValue }) => (
      <Box alignItems="center" alignSelf="stretch" display="flex">
        {renderValue()?.toLocaleDateString(undefined, { dateStyle: "medium" })}
      </Box>
    ),
    header: "Modified",
    size: 150,
  }),
  columnHelper.accessor("modified_by", {
    cell: ({ renderValue }) => (
      <Box alignItems="center" alignSelf="stretch" display="flex">
        {renderValue()}
      </Box>
    ),
    header: "Modified By",
    size: 150,
  }),
];
