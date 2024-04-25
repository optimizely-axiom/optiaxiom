import { Box } from "@optiaxiom/react";

import { Table, Td, Th, Tr } from "../table";

export const Scale = ({ values }: { values: Record<string, string> }) => (
  <Table>
    <thead>
      <tr>
        <Th width={10}>Name</Th>
        <Th width={10}>Size</Th>
        <Box asChild display={["none", "table-cell"]}>
          <Th />
        </Box>
      </tr>
    </thead>
    <tbody>
      {Object.entries(values)
        .sort(([a], [b]) => {
          const aMatch = a.match(/^([0-9.]+)$/);
          const aNum = aMatch === null ? NaN : parseFloat(aMatch[1]);
          const bMatch = b.match(/^([0-9.]+)$/);
          const bNum = bMatch === null ? NaN : parseFloat(bMatch[1]);
          if (isNaN(aNum) && isNaN(bNum)) return 0;
          if (isNaN(aNum)) return 1;
          if (isNaN(bNum)) return -1;
          return aNum - bNum;
        })
        .map(([name, size]) => (
          <Tr key={name}>
            <Td>{name}</Td>
            <Td>{size}</Td>
            <Box asChild display={["none", "table-cell"]}>
              <Td>
                <Box
                  background="purple.500"
                  height={2}
                  style={{ width: size }}
                />
              </Td>
            </Box>
          </Tr>
        ))}
    </tbody>
  </Table>
);
