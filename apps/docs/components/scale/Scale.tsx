import { Box, Text } from "@optiaxiom/react";

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
  values: Record<string, string> | string[];
}) => (
  <Table maxH="sm" overflow="auto">
    <thead>
      <tr>
        <Th className="nx-sticky nx-top-0" style={headerBg}>
          {keyLabel}
        </Th>
        <Th className="nx-sticky nx-top-0" style={headerBg}>
          {valueLabel}
        </Th>
        {!hidePixels && (
          <Th className="nx-sticky nx-top-0" style={headerBg}>
            Pixels
          </Th>
        )}
        {!hidePreview && (
          <Th
            className="nx-sticky nx-top-0"
            display={["none", "table-cell"]}
            style={headerBg}
            w="full"
          />
        )}
      </tr>
    </thead>
    <tbody>
      {(Array.isArray(values)
        ? values.map((value) => [value, value])
        : Object.entries(values)
      )
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
            <Td whiteSpace="nowrap">
              <Text
                color="fg.accent.blue"
                fontFamily="mono"
                fontSize="sm"
                fontWeight="600"
              >
                {name}
              </Text>
            </Td>
            <Td whiteSpace="nowrap">
              <Text
                color="fg.accent.purple"
                fontFamily="mono"
                fontSize="sm"
                fontWeight="500"
              >
                {size}
              </Text>
            </Td>
            {!hidePixels && (
              <Td whiteSpace="nowrap">
                <Text
                  color="fg.accent.purple"
                  fontFamily="mono"
                  fontSize="sm"
                  fontWeight="500"
                >
                  {px(size)}
                </Text>
              </Td>
            )}
            {!hidePreview && (
              <Td display={["none", "table-cell"]}>
                <Box bg="purple.500" h="16" style={{ width: size }} />
              </Td>
            )}
          </Tr>
        ))}
    </tbody>
  </Table>
);
