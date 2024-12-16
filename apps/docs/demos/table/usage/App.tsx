import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@optiaxiom/react/unstable";

import { data } from "./data";

export function App() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>First Name</TableHeaderCell>
          <TableHeaderCell>Last Name</TableHeaderCell>
          <TableHeaderCell>Company</TableHeaderCell>
          <TableHeaderCell>Address</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.company}</TableCell>
            <TableCell>{row.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
