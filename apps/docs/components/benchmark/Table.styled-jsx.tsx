import type { ReactNode } from "react";

import { theme } from "@optiaxiom/react";

const colors = Object.keys(theme.colors).filter((name) =>
  name.match(/\d+$/),
) as Array<keyof (typeof theme)["colors"]>;

type StyleProps = {
  bg?: keyof (typeof theme)["colors"];
  children?: ReactNode;
  display?: "table" | "table-cell" | "table-row";
  p?: keyof (typeof theme)["spacing"];
};

const Box = ({ children, ...props }: StyleProps) => (
  <div className="root">
    {children}
    {/* eslint-disable-next-line react/no-unknown-property */}
    <style jsx>{`
      .root {
        background-color: ${props.bg ? theme.colors[props.bg] : undefined};
        display: ${props.display};
        padding: ${props.p && theme.spacing[props.p]};
      }
    `}</style>
  </div>
);

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
