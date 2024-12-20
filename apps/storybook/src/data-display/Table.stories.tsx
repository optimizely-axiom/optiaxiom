import type { Meta, StoryObj } from "@storybook/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@optiaxiom/react/unstable";

export default {
  component: Table,
} as Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

const invoices = [
  {
    invoice: "INV001",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
  },
  {
    invoice: "INV002",
    paymentMethod: "PayPal",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
  },
  {
    invoice: "INV003",
    paymentMethod: "Bank Transfer",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
  },
  {
    invoice: "INV004",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
  },
  {
    invoice: "INV005",
    paymentMethod: "PayPal",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
  },
  {
    invoice: "INV006",
    paymentMethod: "Bank Transfer",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
  },
  {
    invoice: "INV007",
    paymentMethod: "Credit Card",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
  },
];

export const Basic: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Invoice</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Method</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell>{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const NoRow: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Invoice</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Method</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  ),
};

export const WithColspan: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Invoice</TableHeaderCell>
          <TableHeaderCell colSpan={2}>Payment Details</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell>{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <Table style={{ width: "800px" }}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell style={{ width: "20%" }}>Invoice</TableHeaderCell>
          <TableHeaderCell style={{ width: "20%" }}>Status</TableHeaderCell>
          <TableHeaderCell style={{ width: "40%" }}>Method</TableHeaderCell>
          <TableHeaderCell style={{ width: "20%" }} textAlign="end">
            Amount
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell>{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell textAlign="end">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
