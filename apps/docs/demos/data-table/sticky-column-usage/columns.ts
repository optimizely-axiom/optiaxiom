import {
  columnPinningFeature,
  columnSizingFeature,
  createColumnHelper,
  tableFeatures,
} from "@tanstack/react-table";

export const features = tableFeatures({
  columnPinningFeature,
  columnSizingFeature,
});

const columnHelper = createColumnHelper<
  typeof features,
  {
    amount: string;
    email: string;
    firstName: string;
    id: number;
    jobTitle: string;
    lastName: string;
    username: string;
  }
>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    size: 60,
  }),
  columnHelper.accessor("username", {
    header: "Username",
    size: 150,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    size: 250,
  }),
  columnHelper.accessor("firstName", {
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
  }),
  columnHelper.accessor("jobTitle", {
    header: "Job Title",
    size: 350,
  }),
  columnHelper.accessor("amount", {
    cell: ({ renderValue }) => `$${renderValue()}`,
    header: "Amount",
  }),
]);
