import { theme } from "@optiaxiom/react";
import { Box } from "@optiaxiom/react";

const colors = Object.keys(theme.colors).filter((name) =>
  name.match(/\d+$/),
) as Array<keyof (typeof theme)["colors"]>;

export const Table = ({
  frame,
  table,
}: {
  frame: number;
  table: number[][];
}) => (
  <Box display="table" p="8">
    {table.map((row, i) => (
      <Box display="table-row" key={i}>
        {row.map((_x, j) => (
          <Box
            bg={colors[(j + frame) % colors.length]}
            display="table-cell"
            key={String(i) + String(j)}
            p="8"
          />
        ))}
      </Box>
    ))}
  </Box>
);
