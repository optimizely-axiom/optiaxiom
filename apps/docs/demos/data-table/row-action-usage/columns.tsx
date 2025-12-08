import {
  Box,
  Button,
  DataTableAction,
  DataTableLabel,
  EllipsisMenuButton,
  Group,
  Link,
  Menu,
  MenuContent,
  MenuTrigger,
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
      <Group gap="16" justifyContent="space-between" w="full">
        <DataTableLabel asChild>
          <DataTableAction flex="initial" overflow="hidden" primary>
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

        <Group flex="none" gap="8">
          <Menu
            options={[
              {
                execute: () =>
                  navigator.clipboard.writeText(row.original.id.toString()),
                label: "Copy ID",
              },
              { label: "Edit" },
              { intent: "danger", label: "Delete" },
            ]}
          >
            <DataTableAction>
              <MenuTrigger asChild>
                <EllipsisMenuButton
                  appearance="subtle"
                  aria-label="More options"
                  size="sm"
                />
              </MenuTrigger>
            </DataTableAction>
            <MenuContent />
          </Menu>

          <DataTableAction>
            <Button
              appearance="subtle"
              aria-label="Share"
              icon={<IconShare3 />}
              size="sm"
            />
          </DataTableAction>
        </Group>
      </Group>
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
