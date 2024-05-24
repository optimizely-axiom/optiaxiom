import { Box, theme } from "@optiaxiom/react";

import styles from "./Table.baseline.module.css";

const colors = Object.keys(theme.colors)
  .filter((name) => name.match(/\d+$/))
  .map((name) => name.replace(".", "-"));

export const Table = ({
  frame,
  table,
}: {
  frame: number;
  table: number[][];
}) => (
  <Box className={`${styles["display-table"]} ${styles["p-8"]}`}>
    {table.map((row, i) => (
      <Box className={styles["display-table-row"]} key={i}>
        {row.map((_x, j) => (
          <Box
            className={`${styles[`bg-${colors[(j + frame) % colors.length]}`]} ${styles["display-table-cell"]} ${styles["p-8"]}`}
            key={String(i) + String(j)}
          />
        ))}
      </Box>
    ))}
  </Box>
);
