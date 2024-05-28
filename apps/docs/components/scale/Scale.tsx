import { Box } from "@optiaxiom/react";

import { Table, Td, Th, Tr } from "../table";

const px = (rem: string) =>
  rem.endsWith("rem")
    ? `${parseFloat((parseFloat(rem.slice(0, -3)) * 16).toFixed(3))}px`
    : rem;

const headerBg = {
  background: "light-dark(rgb(255 255 255 / 80%), rgb(17 17 17 / 80%))",
};

export const Scale = ({
  hidePixels,
  hidePreview,
  keyLabel = "Name",
  valueLabel = "Size",
  values,
}: {
  hidePixels?: boolean;
  hidePreview?: boolean;
  keyLabel?: string;
  valueLabel?: string;
  values: Record<string, string>;
}) => (
  <Table maxH="sm" overflow="auto">
    <thead>
      <tr>
        <Th position="sticky" style={headerBg} top="0">
          {keyLabel}
        </Th>
        <Th position="sticky" style={headerBg} top="0">
          {valueLabel}
        </Th>
        {!hidePixels && (
          <Th position="sticky" style={headerBg} top="0">
            Pixels
          </Th>
        )}
        {!hidePreview && (
          <Th
            display={["none", "table-cell"]}
            position="sticky"
            style={headerBg}
            top="0"
            w="full"
          />
        )}
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
            <Td whiteSpace="nowrap">{name}</Td>
            <Td whiteSpace="nowrap">{size}</Td>
            {!hidePixels && <Td whiteSpace="nowrap">{px(size)}</Td>}
            {!hidePreview && (
              <Box asChild display={["none", "table-cell"]}>
                <Td>
                  <Box bg="purple.500" h="16" style={{ width: size }} />
                </Td>
              </Box>
            )}
          </Tr>
        ))}
    </tbody>
  </Table>
);
